import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {

  const { i18n } = useTranslation();
  
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="fr" name="language" /> French
    </div>
  );
};
export default LanguageSelector;