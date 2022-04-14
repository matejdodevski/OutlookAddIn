import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChooseOption from "./ChooseOption/ChooseOption";
import ChooseSend from "./ChooseSend/ChooseSend";
import ChooseSign from "./ChooseSign/ChooseSign";
import EnterData from "./EnterData/EnterData";
import SendData from "./SendData/SendData";
import styles from "./Wizard.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faFileSignature, faFileImport, faGlobe, faFilePen } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import ChooseLanguage from "./ChooseLanguage/ChooseLanguage";
import i18next from "i18next";
import ChooseSendMultiple from "./ChooseSendMultiple/ChooseSendMultiple";
import EnterDataMultiple from "./EnterDataMultiple/EnterDataMultiple";
import SendDataMultiple from "./SendDataMultiple/SendDataMultiple";
library.add(faHome);
library.add(faFileSignature);
library.add(faFileImport);
library.add(faGlobe);
library.add(faFilePen);


const wizard = () => {
  const [navigating, setNavigating] = useState<any[]>(["chooseOption"]);

  const navigatorHandle = (route: any[]) => {
    setNavigating(route);
  };

  return (
    <div>
      {navigating[0] != "chooseOption" && (
        <div className={styles.navBar}>
          <a data-tip={i18next.t("navBar.changeLanguage")}>
            <FontAwesomeIcon
              className={styles.iconFirst}
              icon="globe"
              onClick={() => setNavigating(["chooseLanguage"])}
            />
          </a>
          <ReactTooltip place="top" type="info" effect="float" />
          <a data-tip={i18next.t("navBar.signButton")}>
            <FontAwesomeIcon
              className={styles.icon}
              icon="file-signature"
              onClick={() => setNavigating(["chooseSign"])}
            />
          </a>
          <ReactTooltip place="top" type="info" effect="float" />
          <a data-tip={i18next.t("navBar.sendButton")}>
            <FontAwesomeIcon className={styles.icon} icon="file-import" onClick={() => setNavigating(["chooseSend"])} />
          </a>
          <ReactTooltip place="top" type="info" effect="float" />

          <a data-tip={i18next.t("navBar.sendButtonMultiple")}>
            <FontAwesomeIcon className={styles.icon} icon="file-pen" onClick={() => setNavigating(["chooseSendMultiple"])} />
          </a>
          <ReactTooltip place="top" type="info" effect="float" />
        </div>
      )}
      <div>{navigating[0] === "chooseOption" && <ChooseOption navigatorFunction={navigatorHandle}></ChooseOption>}</div>
      <div>{navigating[0] === "chooseSend" && <ChooseSend navigatorFunction={navigatorHandle}></ChooseSend>}</div>
      <div>{navigating[0] === "chooseSendMultiple" && <ChooseSendMultiple navigatorFunction={navigatorHandle}></ChooseSendMultiple>}</div>
      <div>{navigating[0] === "chooseSign" && <ChooseSign navigatorFunction={navigatorHandle}></ChooseSign>}</div>
      <div>
        {navigating[0] === "chooseLanguage" && <ChooseLanguage navigatorFunction={navigatorHandle}></ChooseLanguage>}
      </div>
      <div>
        {navigating[0] === "enterData" && (
          <EnterData navigatorFunction={navigatorHandle} file={navigating[1]} name={navigating[2]}></EnterData>
        )}
      </div>
      <div>
        {navigating[0] === "enterDataMultiple" && (
          <EnterDataMultiple navigatorFunction={navigatorHandle} file={navigating[1]} name={navigating[2]}></EnterDataMultiple>
        )}
      </div>
      <div>
        {navigating[0] === "sendData" && (
          <SendData
            navigatorFunction={navigatorHandle}
            data={navigating[1]}
          ></SendData>
        )}
        
      </div>

      <div>
        {navigating[0] === "sendDataMultiple" && (
          <SendDataMultiple
            navigatorFunction={navigatorHandle}
            data={navigating[1]}
          ></SendDataMultiple>
        )}
        
      </div>
    </div>
  );
};

export default wizard;
