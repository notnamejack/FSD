import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { setAppLanguage, type SupportedLanguage } from '@/shared/lib';
import { FlagIcon } from '@/shared/ui';

import './language-switcher.scss';

const LANGUAGE_OPTIONS: SupportedLanguage[] = ['en', 'ru'];

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const current = (i18n.language as SupportedLanguage) || 'en';

  return (
    <Select<SupportedLanguage>
      value={current}
      onChange={setAppLanguage}
      popupMatchSelectWidth={false}
      className="language-switcher"
      options={LANGUAGE_OPTIONS.map((code) => ({
        value: code,
        label: t(`language.${code}`),
      }))}
      labelRender={({ value }) => (
        <span className="language-switcher__value">
          <FlagIcon code={value as SupportedLanguage} />
          <span>{t(`language.${value as SupportedLanguage}`)}</span>
        </span>
      )}
      optionRender={(option) => (
        <span className="language-switcher__option">
          <FlagIcon code={option.value as SupportedLanguage} />
          <span>{option.label}</span>
        </span>
      )}
    />
  );
};
