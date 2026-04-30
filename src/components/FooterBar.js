import './../App.css';
import vkIcon from './../images/vk-vk.png'; // Импортируем изображение
import tgIcon from './../images/tg-tg.png'; // Импортируем изображение
import max from './../images/max.png'; // Импортируем изображение

const FooterBar = () => {
    return (
        <section className="Footer">
            <footer className="footer">
                <div className="container">
                    <div className="footer__content">
                        <p>Сервис не занимается деятельностью по предоставлению банковских услуг и выдаче займов. </p>
                        <p>Содержание сайта не является рекомендацией или офертой, вся информация носит ознакомительный характер.</p>
                        <p>При использовании материалов гиперссылка на Енот Мани обязательна.</p>
                    </div>

                    <div className="footer__content-title">
                        <p>Мы используем файлы cookie, чтобы предоставить пользователям больше возможностей при посещении сайта Енот Мани</p>
                        <p>Продолжая пользоваться сайтом, вы даёте согласие на использование cookie и обработку персональных данных.</p>
                        <p>Условия использования</p>
                        <p>Оценивайте свои финансовые возможности и риски</p>
                    </div>

                    <div className="footer__content-icon">
                        <div className="icon__content">
                            {/* Ссылка с изображением и текстом */}
                            <a href="https://vk.com/skupka_59_perm" target="_blank" rel="noopener noreferrer">
                                <img src={vkIcon} alt="Логотип Вконтакте" className="footer-icon" />
                                
                            </a>
                            {/* Ссылка с изображением и текстом */}
                            <a href="https://max.ru/join/ABBu3RDHXvg7o3V7RB0i0JE1rxw2ZYTbkEzYAliHJo4" target="_blank" rel="noopener noreferrer">
                                <img src={max} alt="Логотип Вконтакте" className="footer-icon" />
                                
                            </a>

                         

                            {/* Еще одна ссылка с изображением (иконка) */}
                            <a href="https://t.me/enot_mani" target="_blank" rel="noopener noreferrer">
                                <img src={tgIcon} alt="Логотип Одноклассники" className="footer-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default FooterBar;