import { MainLayout } from '@/layout';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BasePage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default BasePage;
