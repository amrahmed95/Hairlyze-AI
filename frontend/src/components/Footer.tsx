import { Link } from 'react-router-dom'; 
import FooterStyles from '../styles/FooterStyles';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className={FooterStyles.footer}>
            <div className={FooterStyles.container}>
                <div className={FooterStyles.logo}>
                    <span className={FooterStyles.logoHighlight}>H</span>airlyze AI
                    <span className={FooterStyles.logoHighlight}>.</span>
                </div>
                <div className={FooterStyles.links}>
                    <Link to="/privacy" className={FooterStyles.link}>Privacy Policy</Link>
                    <Link to="/terms" className={FooterStyles.link}>Terms of Service</Link>
                    <Link to="/contact" className={FooterStyles.link}>Contacts</Link>
                </div>
                <div className={FooterStyles.links}>
                    <Link to="/Home" className={FooterStyles.link}>Home</Link>
                    <Link to="/about" className={FooterStyles.link}>About</Link>
                    <Link to="/pricing" className={FooterStyles.link}>Pricing</Link>
                    <Link to="#" className={FooterStyles.link}>Get Started</Link>
                    <Link to="#" className={FooterStyles.link}>Login</Link>
                </div>
                <div className={FooterStyles.socialMedia}>
                    <a href="#" className={FooterStyles.socialLink}>
                        <FaFacebook />
                    </a>
                    <a href="#" className={FooterStyles.socialLink}>
                        <FaTwitter />
                    </a>
                    <a href="#" className={FooterStyles.socialLink}>
                        <FaInstagram />
                    </a>
                    <a href="#" className={FooterStyles.socialLink}>
                        <FaPinterestP />
                    </a>
                </div>
                <div className={FooterStyles.copy}>
                    &copy; {new Date().getFullYear()} Hairlyze AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
