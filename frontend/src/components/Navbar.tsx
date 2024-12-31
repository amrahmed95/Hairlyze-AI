import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '../styles/NavbarStyles';
import { logo }from '../assets/index';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn = false } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLogoLoaded, setIsLogoLoaded] = useState(true);

  // toggleMenu: Clicking the hamburger menu toggles the visibility of the navigation links by updating the isMenuOpen state. 
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth >= 768) setIsMenuOpen(false);
      }, 150);
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  // handleNavigation for Get Started and Login by checking the authentication state once:
  const handleNavigation = (path: string) => {
    navigate(isSignedIn ? '/dashboard/analysis' : path);
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={`${styles.logo} text-2xl font-bold text-gray-800`}>
          {isLogoLoaded ? (
            <img 
              src={logo} 
              alt="Hairlyze AI Logo" 
              onError={() => setIsLogoLoaded(false)} 
              className="w-16 h-16 md:w-20 md:h-20" 
            />
          ) : (
            "Hairlyze AI"
          )}
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className={styles.toggleButton}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

       
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.openMenu : styles.closedMenu}`}>
          <li>
            <Link to="/" className={styles.link}>Home</Link>
          </li>
          <li>
            <Link to="/pricing" className={styles.link}>Pricing</Link>
          </li>
          <li>
            <Link to="/about" className={styles.link}>About</Link>
          </li>
        </ul>

        
        <div className={styles.actionButtons}>
          <button
            className={styles.getStartedButton}
            onClick={() => handleNavigation('/signup')}
          >
            Get Started
          </button>
          <button
            className={styles.loginButton}
            onClick={() => handleNavigation('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;