import frFR from 'antd/locale/fr_FR';
import { ConfigProvider, App as AntApp } from 'antd';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Artist,
  Cinema,
  Community,
  Home,
  Login,
  Movie,
  Music,
  NotFound,
  Register,
  TV,
  UserProfile
} from '@pages/index';
import AppWrapper from '@services/AppWrapper';
import ScrollToTop from '@services/ScrollToTop';
import { Footer, ModalReloadSW } from '@components/index';

const App = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered');
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: { colorPrimary: '#d83f4a', borderRadius: 3 }
      }}>
      <AntApp>
        <BrowserRouter>
          <ScrollToTop />
          <ModalReloadSW
            offlineReady={offlineReady}
            needRefresh={needRefresh}
            close={close}
            updateServiceWorker={updateServiceWorker}
          />
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />

            <Route element={<AppWrapper />}>
              <Route element={<Home />} path="/" />

              <Route element={<Cinema />} path="/cinema" />
              <Route element={<Movie />} path="/cinema/films/:movieId" />
              <Route element={<TV />} path="/cinema/series/:movieId" />

              <Route element={<Music />} path="/musique" />
              <Route element={<Artist />} path="/musique/:artistId" />

              <Route element={<Community />} path="/communaute" />
              <Route element={<UserProfile />} path="/communaute/:userId" />
            </Route>

            {/* 404 */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
