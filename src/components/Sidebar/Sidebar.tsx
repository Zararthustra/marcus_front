import { useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  IconHome,
  IconOnOff,
  IconClap,
  IconSidebarClose,
  IconSidebarOpen,
  IconUser,
  logo,
  IconCommunity,
  IconMusic,
  IconLogin
} from '@assets/index';
import { clearLS, getLS } from '@services/localStorageService';

import './Sidebar.scss';

interface ISidebarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: (value: boolean) => void;
}

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: ISidebarProps) => {
  const navigate = useNavigate();
  const isLogged = !!getLS('accessToken');
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });

  const handleReset = () => {
    clearLS();
    navigate(0);
  };

  useEffect(() => {
    if (isMobile) setIsOpenSidebar(false);
  }, [location.pathname]);

  if (isMobile && !isOpenSidebar)
    return (
      <div className="sidebar-mobile flex justify-between align-center p-1">
        <IconSidebarOpen
          size={35}
          className="sidebar__icon"
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        />
        <img src={logo} alt="Logo Marcus" className="sidebar__logo" />
      </div>
    );

  return (
    <div
      className={
        isOpenSidebar ? 'sidebar sidebar--open' : 'sidebar sidebar--close'
      }>
      <div
        className={
          isOpenSidebar
            ? 'sidebar-items sidebar-items--open flex-col'
            : 'sidebar-items sidebar-items--close flex-col align-center'
        }>
        {/* Closed */}
        {!isOpenSidebar && (
          <>
            <IconSidebarOpen
              size={35}
              className="sidebar__icon mt-1"
              onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            />
            <div
              className="flex-col justify-between align-center mt-2"
              style={{ height: '100%' }}>
              <div className="flex-col gap-1 align-center">
                {/* Home */}
                <div className={location.pathname === '/' ? 'active-item' : ''}>
                  <IconHome
                    width={35}
                    height={35}
                    className="sidebar__icon-item"
                    onClick={() => navigate('/')}
                  />
                </div>

                {/* Cinema */}
                <div
                  className={
                    location.pathname === '/cinema' ? 'active-item' : ''
                  }>
                  <IconClap
                    width={35}
                    height={35}
                    className="sidebar__icon-item"
                    onClick={() => navigate('/cinema')}
                  />
                </div>

                {/* Music */}
                <div
                  className={
                    location.pathname === '/musique' ? 'active-item' : ''
                  }>
                  <IconMusic
                    width={35}
                    height={35}
                    className="sidebar__icon-item"
                    onClick={() => navigate('/musique')}
                  />
                </div>

                {/* Community */}
                <div
                  className={
                    location.pathname === '/communaute' ? 'active-item' : ''
                  }>
                  <IconCommunity
                    width={35}
                    height={35}
                    className="sidebar__icon-item"
                    onClick={() => navigate('/communaute')}
                  />
                </div>
              </div>

              {/* Login */}
              <div className="flex-col align-center gap-05">
                {isLogged ? (
                  <IconOnOff
                    width={35}
                    height={35}
                    className="sidebar__icon-logout"
                    onClick={handleReset}
                  />
                ) : (
                  <IconLogin
                    width={35}
                    height={35}
                    className="sidebar__icon-login"
                    onClick={() => navigate('/login')}
                  />
                )}

                <p
                  className="mt-0 mb-05 f-xs"
                  style={{
                    color: 'var(--color-grey-400)'
                  }}>
                  {APP_VERSION}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Open */}
        {isOpenSidebar && (
          <>
            <div className="flex justify-between align-center mt-1 mx-1">
              <img src={logo} alt="Logo Marcus" className="sidebar__logo" />

              <IconSidebarClose
                size={35}
                className="sidebar__icon"
                onClick={() => setIsOpenSidebar(!isOpenSidebar)}
              />
            </div>
            <div
              className="flex-col justify-between mt-2"
              style={{ height: '100%' }}>
              <div className="flex-col gap-1">
                {/* Home */}
                <div className="sidebar__item">
                  <div
                    className={location.pathname === '/' ? 'active-item' : ''}>
                    <IconHome
                      width={35}
                      height={35}
                      className="sidebar__icon-item"
                      onClick={() => navigate('/')}
                    />
                  </div>
                  <Link className="sidebar__link" to="/">
                    Accueil
                  </Link>
                </div>

                {/* Cinema */}
                <div className="sidebar__item">
                  <div
                    className={
                      location.pathname === '/cinema' ? 'active-item' : ''
                    }>
                    <IconClap
                      width={35}
                      height={35}
                      className="sidebar__icon-item"
                      onClick={() => navigate('/cinema')}
                    />
                  </div>
                  <Link className="sidebar__link" to="/cinema">
                    Cinéma
                  </Link>
                </div>

                {/* Music */}
                <div className="sidebar__item">
                  <div
                    className={
                      location.pathname === '/musique' ? 'active-item' : ''
                    }>
                    <IconMusic
                      width={35}
                      height={35}
                      className="sidebar__icon-item"
                      onClick={() => navigate('/musique')}
                    />
                  </div>
                  <Link className="sidebar__link" to="/musique">
                    Musique
                  </Link>
                </div>

                {/* Community */}
                <div className="sidebar__item">
                  <div
                    className={
                      location.pathname === '/communaute' ? 'active-item' : ''
                    }>
                    <IconCommunity
                      width={35}
                      height={35}
                      className="sidebar__icon-item"
                      onClick={() => navigate('/communaute')}
                    />
                  </div>
                  <Link className="sidebar__link" to="/communaute">
                    Communauté
                  </Link>
                </div>
              </div>

              {/* Logout */}
              <div className="flex-col gap-05">
                {isLogged ? (
                  <div className="sidebar__item">
                    <IconOnOff
                      width={35}
                      height={35}
                      className="sidebar__icon-logout"
                      onClick={handleReset}
                    />
                    <div className="sidebar__link" onClick={handleReset}>
                      Déconnexion
                    </div>
                  </div>
                ) : (
                  <div className="sidebar__item">
                    <IconLogin
                      width={35}
                      height={35}
                      className="sidebar__icon-login"
                      onClick={() => navigate('/login')}
                    />
                    <div
                      className="sidebar__link"
                      onClick={() => navigate('/login')}>
                      Connexion
                    </div>
                  </div>
                )}
                <p
                  className="f-xs self-end mr-1 mt-0 mb-05"
                  style={{
                    color: 'var(--color-grey-400)'
                  }}>
                  Version {APP_VERSION}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
