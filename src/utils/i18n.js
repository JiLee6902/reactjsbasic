import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


i18n
  .use(Backend)
  //LanguageDetector khi đầu vào nó cần biết máy mình đang có ngôn ngữ gì để cập nhập giống vậy
  .use(LanguageDetector)
  // cần nạp vào ứng dụng của chúng ta để tương thích với react
  .use(initReactI18next)
  
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;