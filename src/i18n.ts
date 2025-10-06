import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en", // ✅ corrected option
    resources: {
      en: {
        translation: {
          home: "Home",
          shop: "Shop",
          productList: "Product List",
          allProducts: "All Products",
          blog: "Blog",
          about: "About",
          artisans: "Artisans",
          contact: "Contact",
        },
      },
      hi: {
        translation: {
          home: "होम",
          shop: "दुकान",
          productList: "उत्पाद सूची",
          allProducts: "सभी उत्पाद",
          blog: "ब्लॉग",
          about: "हमारे बारे में",
          artisans: "कारीगर",
          contact: "संपर्क",
        },
      },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
