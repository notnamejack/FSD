import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Statistic } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <Card title={t('counter.title')} style={{ width: 280 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Statistic value={count} />
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => setCount((prev) => prev - 1)}
          >
            {t('counter.decrease')}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCount((prev) => prev + 1)}
          >
            {t('counter.increase')}
          </Button>
        </Space>
      </Space>
    </Card>
  );
};
