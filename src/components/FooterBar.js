import { Link } from 'react-router-dom';
import './../App.css';

const FooterBar = () => {
    return (
        <section className="Footer">
            <footer class="footer">
                <div class="container">
                    <div class="footer__content">
                        <p>Сервис не занимается деятельностью по предоставлению банковских услуг и выдаче займов. </p>
                        <p> Содержание сайта не является рекомендацией или офертой, вся информация носит ознакомительный характер.</p>
                        <p> При использовании материалов гиперссылка на Енот Мани обязательна.</p>
                    </div>

                    <div class="footer__content-titile">
                        <p>Мы используем файлы cookie, чтобы предоставить пользователям больше возможностей при посещении сайта Енот Мани</p>
                        <p>Продолжая пользоваться сайтом, вы даёте согласие на использование cookie и обработку персональных данных.</p>
                        <p>Условия использования  </p>
                        <Link to="/Loans">
                            <p><span class="footer__a">Смотрите здесь</span></p>
                        </Link>
                        <p>Оценивайте свои финансовые возможности и риски</p>
                    </div>

                </div>
            </footer>
        </section>
    );
};

export default FooterBar;