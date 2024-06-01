import { Footer, Topbar } from '@/components';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="dark:bg-gradient-to-br dark:from-slate-900 dark:to-black">
      <Topbar />
      <div className="px-[10%] min-h-[90vh] py-8">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
