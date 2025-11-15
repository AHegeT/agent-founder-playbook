import { translations, TranslationKeys } from "@/i18n/translations";

/**
 * Custom hook for accessing translation strings
 *
 * This hook provides a simple way to access translations throughout the app.
 * In the future, this can be extended to support multiple languages.
 *
 * @example
 * const { t } = useTranslation();
 * const title = t.home.hero.title;
 */
export const useTranslation = () => {
  // In the future, this could select the appropriate language
  // based on user preference or browser settings
  const currentLanguage = 'en'; // Default language

  return {
    t: translations,
    lang: currentLanguage,
  };
};

export default useTranslation;
