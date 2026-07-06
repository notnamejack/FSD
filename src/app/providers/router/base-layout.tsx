import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

const { Content } = Layout;

export const BaseLayout = () => {
  return (
    <Layout className="base-layout">
      <Header />
      <Content className="base-layout__content">
        <Outlet />
      </Content>
    </Layout>
  );
};
