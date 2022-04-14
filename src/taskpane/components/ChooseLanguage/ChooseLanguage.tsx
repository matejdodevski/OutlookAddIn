import React, { useEffect } from "react";
import styles from "./ChooseLanguage.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import i18next from "i18next";
import { AppProps } from "../../models/AppProps";
library.add(faFilePdf);

export const ChooseLanguage: React.FC<AppProps> = (props) => {
  useEffect(() => {}, []);

  // method to change the language of the app
  function changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
    props.navigatorFunction(["chooseOption"]);
  }

  return (
    <div>
      <div className={styles.parentDiv}>
        <div className={styles.headerStart}>
          <span>{i18next.t("chooseLanguage.title")}</span>
        </div>

        <div onClick={() => changeLanguage("en")} className={styles.language}>
          <img src="assets/en.png" alt="en"></img>
          English
        </div>

        <div onClick={() => changeLanguage("hr")} className={styles.language}>
          <img src="assets/hr.png" alt="hr"></img>
          Hrvatski
        </div>
      </div>
    </div>
  );
};

export default ChooseLanguage;
