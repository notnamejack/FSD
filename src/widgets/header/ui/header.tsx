import { RocketOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { APP_NAME } from '@/shared/config';

import './header.scss';

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const { t } = useTranslation();

  return (
    <AntdHeader className="app-header">
      <Link to="/" className="app-header__logo">
        <Space>
          <RocketOutlined />
          <Text strong style={{ color: 'inherit' }}>
            {APP_NAME}
          </Text>
        </Space>
      </Link>
      <Text className="app-header__tagline">{t('app.tagline')}</Text>
    </AntdHeader>
  );
};
