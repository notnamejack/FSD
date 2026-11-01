import { ApiOutlined } from '@ant-design/icons';
import { Alert, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { resolveApiBaseUrl } from '@/shared/api';

import { useGetHealthQuery } from '../api/healthApi';

export const HealthStatus = () => {
  const { t } = useTranslation();
  const apiConfigured = resolveApiBaseUrl().length > 0;
  const { data, error, isFetching, isUninitialized } = useGetHealthQuery(
    undefined,
    { skip: !apiConfigured },
  );
  const pending = apiConfigured && (isUninitialized || isFetching);

  return (
    <Card
      title={t('health.title')}
      style={{ width: 280 }}
      extra={<ApiOutlined />}
    >
      {pending ? (
        <Spin />
      ) : error || !apiConfigured ? (
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
