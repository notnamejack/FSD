import { ApiOutlined } from '@ant-design/icons';
import { Alert, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetHealthQuery } from '../api/healthApi';

export const HealthStatus = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isUninitialized } = useGetHealthQuery();

  return (
    <Card
      title={t('health.title')}
      style={{ width: 280 }}
      extra={<ApiOutlined />}
    >
      {isUninitialized || isFetching ? (
        <Spin />
      ) : error ? (
        <Alert type="warning" message={t('health.unavailable')} showIcon />
      ) : (
        <Alert
          type="success"
          message={t('health.status', { status: data?.status })}
          showIcon
        />
      )}
    </Card>
  );
};
