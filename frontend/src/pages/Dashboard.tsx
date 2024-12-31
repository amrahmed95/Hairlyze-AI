import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import * as JSX from 'react'
import { FaHome, FaCamera, FaChartLine, FaHistory, FaBars } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { logo, hair } from '../assets/index';
import styles from '../styles/DashboardStyles';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const toggleCard = () => setShowCard((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 3 ? `${username.slice(0, 3)}**` : username;
    const maskedDomain = domain.split('.').map((part, index) => (index === 0 ? `${part[0]}**` : part)).join('.');
    return `${maskedUsername}@${maskedDomain}`;
  };

  return (
    <div className={styles.container}>
      {/* Mobile Toggle Button */}
      {!isHomePage && (
        <div className={styles.mobileToggle}>
          <span className={styles.mobileTitle}>Hair Analysis</span>
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label="Toggle Sidebar"
          >
            <FaBars className={styles.toggleIcon} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {!isHomePage && (
        <Sidebar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          location={location}
          toggleCard={toggleCard}
          user={user}
          cardRef={cardRef}
          showCard={showCard}
          maskEmail={maskEmail}
        />
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

const Sidebar = ({
  toggleSidebar,
  showSidebar,
  location,
  toggleCard,
  user,
  cardRef,
  showCard,
  maskEmail,
}: {
  toggleSidebar: () => void;
  showSidebar: boolean;
  location: ReturnType<typeof useLocation>;
  toggleCard: () => void;
  user: any;
  cardRef: React.RefObject<HTMLDivElement>;
  showCard: boolean;
  maskEmail: (email: string) => string;
}) => (
  <aside
    className={`${styles.sidebar} ${
      showSidebar ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}
  >
    <div className={styles.logoContainer}>
      <img src={logo} alt="Logo" className={styles.logoImage} />
      <span className={styles.logoText}>Hair Analysis</span>
    </div>

    {/* Navigation Links */}
    <nav className={styles.nav}>
      <NavLink to="/dashboard/analysis" label="Beauty" icon={<FaChartLine />} location={location} />
      <NavLink to="/dashboard/photo" label="Take Photo" icon={<FaCamera />} location={location} />
    </nav>

    {/* Sidebar Footer with User Information */}
    <div className={styles.sidebarFooter}>
      <p className={styles.credits}>(Credits: 50)</p>
      <div onClick={toggleCard} className={styles.avatarContainer}>
        <img
          src={user?.profileImageUrl || user?.imageUrl || hair}
          alt="User Avatar"
          className={styles.avatarImage}
        />
      </div>
      <div className={styles.userInfo}>
        <p className={styles.userName}>{user?.fullName || 'Guest User'}</p>
        <p className={styles.userEmail}>
          {maskEmail(user?.primaryEmailAddress?.emailAddress || 'Guest-user@example.com')}
        </p>
      </div>
    </div>

    {/* User Info Card */}
    {showCard && user && (
      <UserCard ref={cardRef} user={user} />
    )}
  </aside>
);

const NavLink = ({
  to,
  label,
  icon,
  location,
}: {
  to: string;
  label: string;
  icon: React.ReactElement;
  location: ReturnType<typeof useLocation>;
}) => (
  <Link
    to={to}
    className={`${styles.navLink} ${
      location.pathname === to ? styles.activeLink : ''
    }`}
  >
    {icon}
    <span className={styles.navText}>{label}</span>
  </Link>
);

const UserCard = React.forwardRef<HTMLDivElement, { user: any }>(
  ({ user }, ref) => (
    <div ref={ref} className={styles.userCard}>
      <div className={styles.cardHeader}>
        <img
          src={user?.profileImageUrl || user?.imageUrl || hair}
          alt="User Avatar"
          className={styles.cardAvatar}
        />
        <div>
          <p className={styles.cardUserName}>{user?.fullName || 'User Name'}</p>
          <p className={styles.cardUserEmail}>
            {user?.primaryEmailAddress?.emailAddress || 'user@example.com'}
          </p>
        </div>
      </div>
    </div>
  )
);

export default Dashboard;
