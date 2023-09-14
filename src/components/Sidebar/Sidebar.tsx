import { useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  IconHome,
  IconOnOff,
  IconClap,
  IconSidebarClose,
  IconSidebarOpen,
  IconUser
} from '@assets/index';
import { clearLS } from '@services/localStorageService';

import './Sidebar.scss';
import IconMusic from '@assets/svg/IconMusic';

interface ISidebarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: (value: boolean) => void;
}

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: ISidebarProps) => {
  const navigate = useNavigate();
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
      <div className="sidebar-mobile">
        <IconSidebarOpen
          size={35}
          className="sidebar__icon mt-1"
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        />
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
              </div>

              {/* Logout */}
              <div className="flex-col align-center">
                <IconOnOff
                  width={35}
                  height={35}
                  className="sidebar__icon-logout"
                  onClick={handleReset}
                />
                <p
                  className="mt-0 mb-05 f-xs"
                  style={{
                    color: 'var(--color-grey-300)'
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
            <div className="flex justify-between mt-1 mr-1">
              <div className="px-1 pt-05">LOGO_HERE</div>
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
              </div>

              {/* Logout */}
              <div className="flex-col">
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
                <p
                  className="f-xs self-end mr-1 mt-0 mb-05"
                  style={{
                    color: 'var(--color-grey-300)'
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
