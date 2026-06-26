from pathlib import Path
from uuid import uuid4

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from sqlalchemy.orm import Session

from .auth import authenticate_admin, create_access_token, get_current_admin
from .config import settings
from .database import Base, engine, get_db, SessionLocal
from .models import GalleryItem, HomeFeature, NavItem, Product, Review, SiteSettings
from .schemas import (
    GalleryItemCreate,
    GalleryItemRead,
    HomeFeatureCreate,
    HomeFeatureRead,
    LoginPayload,
    NavItemCreate,
    NavItemRead,
    ProductCreate,
    ProductRead,
    PublicContent,
    ReviewCreate,
    ReviewRead,
    SiteSettingsRead,
    SiteSettingsUpdate,
    Token,
)
from .seed_data import seed_database

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

media_path = Path(settings.media_dir)
media_path.mkdir(parents=True, exist_ok=True)

Base.metadata.create_all(bind=engine)
with SessionLocal() as session:
    seed_database(session)

app.mount(settings.media_url, StaticFiles(directory=settings.media_dir), name="media")


def list_query(model, db: Session):
    return db.scalars(select(model).order_by(model.position.asc(), model.id.asc())).all()


def get_site_settings(db: Session) -> SiteSettings:
    settings_row = db.scalar(select(SiteSettings))
    if not settings_row:
        raise HTTPException(status_code=404, detail="Site settings not found")
    return settings_row


def get_or_404(db: Session, model, item_id: int):
    item = db.get(model, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post(f"{settings.api_prefix}/auth/login", response_model=Token)
def login(payload: LoginPayload, db: Session = Depends(get_db)) -> Token:
    admin = authenticate_admin(db, payload.username, payload.password)
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return Token(access_token=create_access_token(admin.username))


@app.get(f"{settings.api_prefix}/content", response_model=PublicContent)
def get_public_content(db: Session = Depends(get_db)) -> PublicContent:
    products = db.scalars(select(Product).where(Product.is_active.is_(True)).order_by(Product.category.asc(), Product.position.asc(), Product.id.asc())).all()
    product_map: dict[str, list[ProductRead]] = {}
    for product in products:
        product_map.setdefault(product.category, []).append(ProductRead.model_validate(product))

    return PublicContent(
        settings=SiteSettingsRead.model_validate(get_site_settings(db)),
        nav_items=[NavItemRead.model_validate(item) for item in db.scalars(select(NavItem).where(NavItem.is_visible.is_(True)).order_by(NavItem.position.asc(), NavItem.id.asc())).all()],
        home_features=[HomeFeatureRead.model_validate(item) for item in db.scalars(select(HomeFeature).where(HomeFeature.is_visible.is_(True)).order_by(HomeFeature.position.asc(), HomeFeature.id.asc())).all()],
        gallery_items=[GalleryItemRead.model_validate(item) for item in db.scalars(select(GalleryItem).where(GalleryItem.is_visible.is_(True)).order_by(GalleryItem.position.asc(), GalleryItem.id.asc())).all()],
        reviews=[ReviewRead.model_validate(item) for item in db.scalars(select(Review).where(Review.is_visible.is_(True)).order_by(Review.position.asc(), Review.id.asc())).all()],
        products=product_map,
    )


@app.get(f"{settings.api_prefix}/admin/bootstrap")
def admin_bootstrap(
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> dict:
    return {
        "settings": SiteSettingsRead.model_validate(get_site_settings(db)).model_dump(),
        "nav_items": [NavItemRead.model_validate(item).model_dump() for item in list_query(NavItem, db)],
        "home_features": [HomeFeatureRead.model_validate(item).model_dump() for item in list_query(HomeFeature, db)],
        "gallery_items": [GalleryItemRead.model_validate(item).model_dump() for item in list_query(GalleryItem, db)],
        "reviews": [ReviewRead.model_validate(item).model_dump() for item in list_query(Review, db)],
        "products": [ProductRead.model_validate(item).model_dump() for item in db.scalars(select(Product).order_by(Product.category.asc(), Product.position.asc(), Product.id.asc())).all()],
    }


@app.put(f"{settings.api_prefix}/admin/settings", response_model=SiteSettingsRead)
def update_settings(
    payload: SiteSettingsUpdate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> SiteSettingsRead:
    settings_row = get_site_settings(db)
    for key, value in payload.model_dump().items():
        setattr(settings_row, key, value)
    db.commit()
    db.refresh(settings_row)
    return SiteSettingsRead.model_validate(settings_row)


@app.post(f"{settings.api_prefix}/admin/upload")
def upload_file(
    file: UploadFile = File(...),
    _: object = Depends(get_current_admin),
) -> dict[str, str]:
    suffix = Path(file.filename or "").suffix.lower()
    filename = f"{uuid4().hex}{suffix}"
    destination = media_path / filename
    with destination.open("wb") as output:
        output.write(file.file.read())
    return {"url": f"{settings.media_url}/{filename}"}


def register_crud_routes(prefix: str, model, create_schema, read_schema):
    @app.get(f"{settings.api_prefix}/admin/{prefix}", response_model=list[read_schema])
    def list_items(_: object = Depends(get_current_admin), db: Session = Depends(get_db)):
        items = list_query(model, db)
        return [read_schema.model_validate(item) for item in items]

    @app.post(f"{settings.api_prefix}/admin/{prefix}", response_model=read_schema)
    def create_item(payload: create_schema, _: object = Depends(get_current_admin), db: Session = Depends(get_db)):
        item = model(**payload.model_dump())
        db.add(item)
        db.commit()
        db.refresh(item)
        return read_schema.model_validate(item)

    @app.put(f"{settings.api_prefix}/admin/{prefix}" + "/{item_id}", response_model=read_schema)
    def update_item(item_id: int, payload: create_schema, _: object = Depends(get_current_admin), db: Session = Depends(get_db)):
        item = get_or_404(db, model, item_id)
        for key, value in payload.model_dump().items():
            setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return read_schema.model_validate(item)

    @app.delete(f"{settings.api_prefix}/admin/{prefix}" + "/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_item(item_id: int, _: object = Depends(get_current_admin), db: Session = Depends(get_db)):
        item = get_or_404(db, model, item_id)
        db.delete(item)
        db.commit()


register_crud_routes("nav-items", NavItem, NavItemCreate, NavItemRead)
register_crud_routes("home-features", HomeFeature, HomeFeatureCreate, HomeFeatureRead)
register_crud_routes("gallery-items", GalleryItem, GalleryItemCreate, GalleryItemRead)
register_crud_routes("reviews", Review, ReviewCreate, ReviewRead)
register_crud_routes("products", Product, ProductCreate, ProductRead)
