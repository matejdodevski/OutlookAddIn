import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import styles from "./ChooseOption.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18next from "i18next";
import ReactTooltip from "react-tooltip";
import { AppProps } from "../../models/AppProps";

export default class ChooseOption extends React.Component<AppProps> {
  render() {
    const {} = this.props;
    return (
      <div>
        <div>
          <div className={styles.headerStart}>
            {i18next.t("chooseOption.title")}
            <a data-tip={i18next.t("navBar.changeLanguage")} className={styles.icon}>
              <FontAwesomeIcon
                className={styles.iconFirst}
                icon="globe"
                onClick={() => this.props.navigatorFunction(["chooseLanguage"])}
              />
            </a>

            <ReactTooltip place="top" type="info" effect="float" />
          </div>

          <div className={styles.buttonChoice}>
            <DefaultButton onClick={() => this.props.navigatorFunction(["chooseSign"])}>
              {i18next.t("chooseOption.signButton")}
            </DefaultButton>
          </div>

          <div className={styles.buttonChoice}>
            <DefaultButton onClick={() => this.props.navigatorFunction(["chooseSend"])}>
              {i18next.t("chooseOption.sendButton")}
            </DefaultButton>
          </div>

          <div className={styles.buttonChoice}>
            <DefaultButton onClick={() => this.props.navigatorFunction(["chooseSendMultiple"])}>
              {i18next.t("chooseOption.sendMultipleButton")}
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}
