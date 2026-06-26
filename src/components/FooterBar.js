import './../App.css';
import vkIcon from './../images/vkontakte.png';
import tgIcon from './../images/telega.png';
import max from './../images/max.png';

const iconMap = {
    VK: vkIcon,
    Telegram: tgIcon,
    Max: max,
};

const FooterBar = ({ settings }) => {
    const disclaimerLines = settings?.footer_disclaimer_lines || [];
    const cookieLines = settings?.footer_cookie_lines || [];
    const socialLinks = settings?.social_links || [];

    return (
        <section className="Footer">
            <footer className="footer">
                <div className="container">
                    <div className="footer__content">
                        {disclaimerLines.map((line, index) => <p key={index}>{line}</p>)}
                    </div>

                    <div className="footer__content-title">
                        {cookieLines.map((line, index) => <p key={index}>{line}</p>)}
                    </div>

                    <div className="footer__content-icon">
                        <div className="icon__content">
                            {socialLinks.map((item, index) => (
                                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                                    <img src={iconMap[item.label] || vkIcon} alt={item.label} className="footer-icon" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default FooterBar;
