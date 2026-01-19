import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm rounded-md border border-gray-600 text-gray-200 hover:bg-gray-700 transition"
    >
      {i18n.language === 'en' ? '日本語' : 'EN'}
    </button>
  );
};
  