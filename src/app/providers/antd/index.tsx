import { App as AntdApp, ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import type { SupportedLanguage } from '@/shared/lib';

const ANT_LOCALES = {
  en: enUS,
  ru: ruRU,
} as const;

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || 'en';
  const locale = ANT_LOCALES[language] ?? enUS;

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1a1a1a',
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f3f3f3',
          colorText: '#1a1a1a',
          colorTextSecondary: '#8c8c8c',
          colorBorder: '#e5e5e5',
          borderRadius: 12,
          controlHeight: 40,
          fontSize: 14,
          fontFamily: "'Inter Variable', sans-serif",
        },
        components: {
          Button: {
            primaryColor: '#ffffff',
            colorPrimaryHover: '#333333',
            colorPrimaryActive: '#000000',
            defaultBorderColor: '#d9d9d9',
            colorBorderDisabled: 'transparent',
          },
          Select: {
            optionSelectedBg: '#f3f3f3',
          },
          Table: {
            headerBg: '#ffffff',
            rowHoverBg: '#fafafa',
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};
