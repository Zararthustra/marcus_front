import frFR from 'antd/locale/fr_FR';
import { ConfigProvider, App as AntApp } from 'antd';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppWrapper from '@services/AppWrapper';
import { ModalReloadSW } from '@components/index';
import { Cinema, Home, Music } from '@pages/index';

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
        token: { colorPrimary: '#e77d00', borderRadius: 3 }
      }}>
      <AntApp>
        <BrowserRouter>
          <ModalReloadSW
            offlineReady={offlineReady}
            needRefresh={needRefresh}
            close={close}
            updateServiceWorker={updateServiceWorker}
          />
          <Routes>
            <Route element={<AppWrapper />}>
              <Route element={<Home />} path="/" />
              <Route element={<Cinema />} path="/cinema" />
              <Route element={<Music />} path="/musique" />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
