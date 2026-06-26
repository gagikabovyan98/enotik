from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginPayload(BaseModel):
    username: str
    password: str


class AdminUserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    is_active: bool


class NavItemBase(BaseModel):
    label: str
    path: str
    position: int = 0
    is_visible: bool = True


class NavItemCreate(NavItemBase):
    pass


class NavItemRead(NavItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class HomeFeatureBase(BaseModel):
    title: str
    path: str
    image_url: str | None = None
    alt_text: str | None = None
    position: int = 0
    is_visible: bool = True


class HomeFeatureCreate(HomeFeatureBase):
    pass


class HomeFeatureRead(HomeFeatureBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class GalleryItemBase(BaseModel):
    title: str | None = None
    image_url: str
    position: int = 0
    is_visible: bool = True


class GalleryItemCreate(GalleryItemBase):
    pass


class GalleryItemRead(GalleryItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class ReviewBase(BaseModel):
    name: str
    review_text: str
    avatar_url: str | None = None
    position: int = 0
    is_visible: bool = True


class ReviewCreate(ReviewBase):
    pass


class ReviewRead(ReviewBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class ProductBase(BaseModel):
    category: str
    slug: str
    title: str
    subtitle: str | None = None
    description: str | None = None
    image_url: str | None = None
    link_url: str
    cta_text: str = "Подробнее"
    rate: str | None = None
    term: str | None = None
    amount: str | None = None
    bullets: list[str] = Field(default_factory=list)
    position: int = 0
    is_active: bool = True


class ProductCreate(ProductBase):
    @field_validator("link_url")
    @classmethod
    def validate_link_url(cls, value: str) -> str:
        if value.startswith("data:"):
            raise ValueError("Link URL must be a normal URL, not base64 data")
        if len(value) > 1000:
            raise ValueError("Link URL is too long")
        return value

    @field_validator("image_url")
    @classmethod
    def validate_image_url(cls, value: str | None) -> str | None:
        if value and len(value) > 1000 and not value.startswith("/media/"):
            raise ValueError("Image URL is too long. Upload the image first.")
        return value


class ProductRead(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class SiteSettingsBase(BaseModel):
    site_name: str
    logo_url: str | None = None
    hero_title: str
    hero_subtitle: str
    hero_image_url: str | None = None
    footer_disclaimer_lines: list[str] = Field(default_factory=list)
    footer_cookie_lines: list[str] = Field(default_factory=list)
    social_links: list[dict] = Field(default_factory=list)


class SiteSettingsUpdate(SiteSettingsBase):
    pass


class SiteSettingsRead(SiteSettingsBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class PublicContent(BaseModel):
    settings: SiteSettingsRead
    nav_items: list[NavItemRead]
    home_features: list[HomeFeatureRead]
    gallery_items: list[GalleryItemRead]
    reviews: list[ReviewRead]
    products: dict[str, list[ProductRead]]
