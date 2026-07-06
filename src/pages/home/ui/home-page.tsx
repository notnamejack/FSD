import { Flex, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Counter } from '@/features/counter';
import { LanguageSwitcher } from '@/features/language-switcher';

import { HealthStatus } from '@/entities/health';
import { UserCard } from '@/entities/user';

const { Title, Paragraph } = Typography;

const demoUser = {
  id: 1,
  name: 'Иван Иванов',
  email: 'ivan@example.com',
};

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={24}>
      <Flex justify="space-between" align="center" wrap gap={16}>
        <Typography>
          <Title level={2}>{t('app.title')}</Title>
          <Paragraph>{t('app.description')}</Paragraph>
        </Typography>
        <LanguageSwitcher />
      </Flex>

      <Space size={24} align="start" wrap>
        <Counter />
        <UserCard user={demoUser} />
        <HealthStatus />
      </Space>
    </Flex>
  );
};
