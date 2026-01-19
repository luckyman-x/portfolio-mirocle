// src/components/LanguageButton.tsx
import React from "react";

export const LanguageButton: React.FC = () => {
  const toggleLanguage = () => {
    const html = document.documentElement;
    const currentLang = html.lang === "en" ? "ja" : "en";
    html.lang = currentLang;

    alert(
      currentLang === "ja"
        ? "You need to upgrade your translation module for using it. Alternatively, you can use Chrome’s built-in translation feature by right-clicking on the page and selecting ‘Translate to Japanese.’"
        : "You need to upgrade your translation module for using it. Alternatively, you can use Chrome’s built-in translation feature by right-clicking on the page and selecting ‘Translate to Japanese.’"
    );
  };

  return (
    <button
      onClick={toggleLanguage}
      className="ml-4 px-3 py-1 border border-gray-400 rounded text-gray-300 hover:text-white hover:border-white transition-colors duration-300"
    >
      EN/JP
    </button>
  );
};
