import { PrimaryButton } from "@fluentui/react";
import React, { useState, useEffect } from "react";
import styles from "./EnterData.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { TextField } from "@material-ui/core";
import validator from "validator";
import i18next from "i18next";
import { AppProps } from "../../models/AppProps";
import { HttpClient } from "../../services/httpService";

library.add(faFilePdf);

export const EnterData: React.FC<AppProps> = (props) => {
  const [address, setAddress] = useState({ Email: "" });

  const [emailValid, setEmailValidation] = useState<boolean>();
  const validateEmail = (e) => {
    var email = e.target.value;

    var addressObject = {Email: email};
    setAddress(addressObject);
    if (!validator.isEmail(email)) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
  };

  // useEffect(() => {
  //   const httpClient = new HttpClient();

  
  //   Office.context.mailbox.getUserIdentityTokenAsync(function(result){
  //     console.log(result)
  //   });
  // }, []);

  var data = {
    Document: props.file,
    DocumentName: props.name,
    Signer: address,
  };

  return (
    <div>
      <div className={styles.parentDiv}>
        <div className={styles.headerStart}>
          <span>{i18next.t("enterData.title")}</span>
        </div>

        <div className="textBoxesParent">
          <TextField
            className="textBox"
            id="address"
            label={i18next.t("enterData.addressTextBox")}
            value={address.Email}
            onChange={validateEmail}
            margin="none"
            fullWidth
          />

          {emailValid == false && <span className={styles.mandatory}>{i18next.t("enterData.notValidEmail")}</span>}


          <div className={styles.buttonChoice}>
            <PrimaryButton
              disabled={!emailValid || address.Email.length < 1 }
              onClick={() => props.navigatorFunction(["sendData", data])}
            >
              {i18next.t("enterData.sendButton")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterData;
