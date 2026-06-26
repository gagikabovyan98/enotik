from sqlalchemy import select
from sqlalchemy.orm import Session

from .auth import get_password_hash
from .config import settings
from .models import AdminUser, GalleryItem, HomeFeature, NavItem, Product, Review, SiteSettings


def seed_database(db: Session) -> None:
    if not db.scalar(select(AdminUser).where(AdminUser.username == settings.admin_username)):
        db.add(
            AdminUser(
                username=settings.admin_username,
                password_hash=get_password_hash(settings.admin_password),
                is_active=True,
            )
        )

    if not db.scalar(select(SiteSettings)):
        db.add(
            SiteSettings(
                site_name="ЕнотМани",
                logo_url="/seed-assets/logo.png",
                hero_title="БЫСТРЫЕ",
                hero_subtitle="ЗАЙМЫ НА КАРТУ",
                hero_image_url="/seed-assets/header__banner.webp",
                footer_disclaimer_lines=[
                    "Сервис не занимается деятельностью по предоставлению банковских услуг и выдаче займов.",
                    "Содержание сайта не является рекомендацией или офертой, вся информация носит ознакомительный характер.",
                    "При использовании материалов гиперссылка на Енот Мани обязательна.",
                ],
                footer_cookie_lines=[
                    "Мы используем файлы cookie, чтобы предоставить пользователям больше возможностей при посещении сайта Енот Мани.",
                    "Продолжая пользоваться сайтом, вы даёте согласие на использование cookie и обработку персональных данных.",
                    "Условия использования",
                    "Оценивайте свои финансовые возможности и риски",
                ],
                social_links=[
                    {"label": "VK", "url": "https://vk.com/skupka_59_perm"},
                    {"label": "Max", "url": "https://max.ru/join/ABBu3RDHXvg7o3V7RB0i0JE1rxw2ZYTbkEzYAliHJo4"},
                    {"label": "Telegram", "url": "https://t.me/enot_mani"},
                ],
            )
        )

    if not db.scalar(select(NavItem)):
        db.add_all(
            [
                NavItem(label="Займы", path="/loans", position=1, is_visible=True),
                NavItem(label="Дебетовые карты", path="/cards", position=2, is_visible=True),
                NavItem(label="Потребительские кредиты", path="/consumer-loans", position=3, is_visible=True),
                NavItem(label="Кредитные карты", path="/auto-loans", position=4, is_visible=True),
                NavItem(label="Кредиты под залог", path="/collateral-loans", position=5, is_visible=True),
                NavItem(label="Вакансии", path="/job", position=6, is_visible=True),
                NavItem(label="Обучение", path="/education", position=7, is_visible=True),
            ]
        )

    if not db.scalar(select(HomeFeature)):
        db.add_all(
            [
                HomeFeature(title="Кредитная история", path="/", image_url="/seed-assets/KreditHistory.png", alt_text="Кредитная история", position=1),
                HomeFeature(title="Дебетовые карты", path="/cards", image_url="/seed-assets/debetcard.png", alt_text="Дебетовые карты", position=2),
                HomeFeature(title="Образование", path="/education", image_url="/seed-assets/obrozovanie.png", alt_text="Образование", position=3),
                HomeFeature(title="Кредитный рейтинг", path="/", image_url="/seed-assets/grafik.png", alt_text="Кредитный рейтинг", position=4),
                HomeFeature(title="Букмейкеры", path="/", image_url="/seed-assets/monetka.png", alt_text="Букмейкеры", position=5),
                HomeFeature(title="Вакансии", path="/job", image_url="/seed-assets/rabota.png", alt_text="Вакансии", position=6),
            ]
        )

    if not db.scalar(select(GalleryItem)):
        gallery_items = [
            "otp_bank.png",
            "akbars__bank.png",
            "uralsib__bank.png",
            "alfaBank.png",
            "t_Bank.png",
            "renesans.png",
        ]
        db.add_all([GalleryItem(title=item, image_url=f"/seed-assets/{item}", position=index + 1) for index, item in enumerate(gallery_items)])

    if not db.scalar(select(Review)):
        db.add_all(
            [
                Review(name="Иван Кужич", review_text="Очень быстро оформили займ, всё прозрачно и без скрытых комиссий. Рекомендую!, главное все внимательно читайте при оформлении займа или кредита.", avatar_url="/seed-assets/avatar1.webp", position=1),
                Review(name="Мария Смирнова", review_text="Пользуюсь сервисом уже полгода, всегда одобряют заявки. Отличная поддержка! А еще в данном сервисе бывают вакансии что не мало важно для тех кто в поиске работы.", avatar_url="/seed-assets/avatar2.webp", position=2),
                Review(name="Андрей Филимонов", review_text="Таких сервисов в интернете очень много, но почему то доверился Енот-мани, лчино мне он нравится, работает как часы, все просто и понятно, да и выбора  кредитов много.", avatar_url="/seed-assets/avatar3.webp", position=3),
                Review(name="София Мансурова", review_text="Огромное спасибо за прекрасный сервис, енот-мани Вы лучшие, и расешите, и займ можно оформит, сегла слежу за Вашими новостями в ленте и в историях!", avatar_url="/seed-assets/avatar4.webp", position=4),
            ]
        )

    if not db.scalar(select(Product)):
        products = [
            {"category": "loans", "slug": "finters", "title": "FINTERS", "image_url": "/seed-assets/finters.webp", "rate": "0.8% в день", "term": "до 24 недель", "amount": "3000 - 50 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7307&p=10695&erid=2W5zFH4LCZF", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 1},
            {"category": "loans", "slug": "finmi", "title": "FinMi", "image_url": "/seed-assets/FinMi.webp", "rate": "0.8% в день", "term": "до 70 дней", "amount": "1000 - 50 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7304&p=10695&erid=2W5zFHRjyh3", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 2},
            {"category": "loans", "slug": "privet-sosed", "title": "Привет, сосед!", "image_url": "/seed-assets/sosed.webp", "rate": "0.8% в день", "term": "до 31 дня", "amount": "1000 - 30 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7280&p=10695&erid=2W5zFHNcvWu", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 3},
            {"category": "loans", "slug": "carmoney", "title": "CarMoney", "image_url": "/seed-assets/car.webp", "rate": "до 75% годовых", "term": "до 84 недель", "amount": "50 000 - 1 млн ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7234&p=10695&erid=2W5zFHkxvwA", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 4},
            {"category": "loans", "slug": "alistar", "title": "Алистар", "image_url": "/seed-assets/ali.webp", "rate": "0.8% в день", "term": "до 24 недель", "amount": "5000 - 100 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7233&p=10695&erid=2W5zFJ8ghUV", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 5},
            {"category": "loans", "slug": "granat-finance", "title": "GranatFinance", "image_url": "/seed-assets/grand.webp", "rate": "0.8% в день", "term": "до 360 дней", "amount": "1000 - 100 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7223&p=10695&erid=2W5zFJN4wcM", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 6},
            {"category": "loans", "slug": "asiacredit", "title": "Asiacredit", "image_url": "/seed-assets/asia.webp", "rate": "0.6% в день", "term": "до 12 месяцев", "amount": "5000 - 100 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7213&p=10695&erid=2W5zFHEjvPr", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 7},
            {"category": "loans", "slug": "dobrozaim", "title": "Доброзайм", "image_url": "/seed-assets/dobro.webp", "rate": "0.8% в день", "term": "до 364 дней", "amount": "1000 - 100 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7178&p=10695&erid=2W5zFHnPQoT", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 8},
            {"category": "loans", "slug": "medium-score", "title": "Medium Score", "image_url": "/seed-assets/medium.webp", "rate": "0.8% в день", "term": "до 30 дней", "amount": "3000 - 30 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7128&p=10695&erid=2W5zFJDLBdS", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 9},
            {"category": "loans", "slug": "zaimer", "title": "Займер", "image_url": "/seed-assets/zaimer.webp", "rate": "0.8% в день", "term": "до 30 дней", "amount": "2000 - 30 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7073&p=10695&erid=2W5zFJCB1U4", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 10},
            {"category": "cards", "slug": "vtb-mir", "title": "ВТБ - Дебетовая карта МИР Весёлая", "image_url": "/seed-assets/vtb.webp", "bullets": ["Кешбэк рублями до 3000 ₽", "Бесплатная доставка по России", "Бесплатное обслуживание"], "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7332&p=10695&erid=2W5zFJuUpi5", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 1},
            {"category": "cards", "slug": "alfa-orange", "title": "Альфа-Банк - Апельсиновая карта", "image_url": "/seed-assets/alfa.webp", "bullets": ["Кешбэк до 7% на продукты", "Оплачивайте баллами до 100%", "Бесплатное обслуживание"], "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=7049&p=10695&erid=2W5zFHrdQPS", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 2},
            {"category": "cards", "slug": "mts-money", "title": "МТС Деньги - Дебетовая карта", "image_url": "/seed-assets/mts.webp", "bullets": ["До 10 000 ₽ кешбэк в месяц", "5% в супермаркетах", "30% на связь"], "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6766&p=10695&erid=2W5zFFy4MBv", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 3},
            {"category": "consumer-loans", "slug": "russkiy-standart-cash", "title": "Русский Стандарт Банк - Наличными", "image_url": "/seed-assets/rus.webp", "rate": "До 65% годовых", "term": "До 60 месяцев", "amount": "30 000 - 3 млн ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6459&p=10695&erid=2W5zFH1t71s", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 1},
            {"category": "consumer-loans", "slug": "sovkombank-cash", "title": "Совкомбанк - Наличными", "image_url": "/seed-assets/sov.webp", "rate": "До 30% годовых", "term": "До 5 лет", "amount": "30 000 - 5 млн ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=5199&p=10695&erid=2W5zFGFFjxt", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 2},
            {"category": "auto-loans", "slug": "zaimer-virtual", "title": "Займер - Виртуальная карта", "image_url": "/seed-assets/zaimer.webp", "rate": "0,65% в день", "term": "До 180 дней", "amount": "15 000 - 100 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6736&p=10695&erid=2W5zFGNo5ep", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 1},
            {"category": "auto-loans", "slug": "akbars-115", "title": "АК Барс - Кредитная карта 115 дней", "image_url": "/seed-assets/bars.webp", "rate": "До 115 дней без %", "term": "До 5 лет", "amount": "10 000 - 1 000 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6474&p=10695&erid=2W5zFHxn2e4", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 2},
            {"category": "collateral-loans", "slug": "drivezaim-pts", "title": "ДрайвЗайм - Залог ПТС", "image_url": "/seed-assets/draiv.webp", "rate": "До 9% в месяц", "term": "До 3 лет", "amount": "10 000 - 500 000 ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6864&p=10695&erid=2W5zFHwPkAU", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 1},
            {"category": "collateral-loans", "slug": "carmoney-million", "title": "CarMoney - займ на карту до 1 млн", "image_url": "/seed-assets/car.webp", "rate": "До 129% годовых", "term": "До 48 месяцев", "amount": "50 000 - 1 млн ₽", "link_url": "https://fin-lg.com/aff_c?aff_id=145356&offer_id=6848&p=10695&erid=2W5zFJEsCvt", "cta_text": "ПОЛУЧИТЬ ДЕНЬГИ", "position": 2},
            {"category": "job", "slug": "yandex-market", "title": "Яндекс-Маркет", "subtitle": "Кладовщик", "image_url": "/seed-assets/yandex1.webp", "link_url": "https://my.saleads.pro/s/p04u3?erid=2Vtzqw9y84u", "cta_text": "ОСТАВИТЬ ЗАЯВКУ", "position": 1},
            {"category": "job", "slug": "t-bank-hr", "title": "Работа в Т-Банке HR", "subtitle": "Представитель", "image_url": "/seed-assets/tbank.webp", "link_url": "https://my.saleads.pro/s/zaoh6?erid=2VtzqubADhQ", "cta_text": "ОСТАВИТЬ ЗАЯВКУ", "position": 2},
            {"category": "education", "slug": "psychology-coaching", "title": "Психология и коучинг", "image_url": "/seed-assets/psiho.webp", "link_url": "https://my.saleads.pro/s/6wph8?erid=2VtzqvtrNqM", "cta_text": "ПОДРОБНЕЕ", "position": 1},
            {"category": "education", "slug": "ege-oge", "title": "Школа по подготовке к ЕГЭ и ОГЭ", "image_url": "/seed-assets/insperian.webp", "link_url": "https://my.saleads.pro/s/cvo45?erid=2VtzqvPR239", "cta_text": "ПОДРОБНЕЕ", "position": 2},
        ]
        db.add_all([Product(**item) for item in products])

    db.commit()
