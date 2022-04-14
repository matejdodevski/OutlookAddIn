import { Button, DefaultButton, PrimaryButton } from "@fluentui/react";
import React, { useState, useEffect } from "react";
import styles from "./EnterDataMultiple.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { TextField } from "@material-ui/core";
import validator from "validator";
import i18next from "i18next";
import { AppProps } from "../../models/AppProps";
library.add(faFilePdf);

export const EnterDataMultiple: React.FC<AppProps> = (props) => {
  const [addressList, setAddress] = useState<any>([{ Email: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addressList];
    list[index][name] = value;
    setAddress(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    console.log(index);
    const list = [...addressList];
    list.splice(index, 1);
    console.log(list);
    setAddress(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setAddress([...addressList, { Email: "" }]);
  };

  const [emailsValid, setEmailValidation] = useState<boolean>();

  const validateEmail = (e, index) => {
    handleInputChange(e, index);
    setEmailValidation(true);
    addressList.forEach((email) => {
      if (!validator.isEmail(email.Email)) {
        setEmailValidation(false);
      }
    });
  };

  useEffect(() => {}, []);

  var data = {
    Document: props.file,
    DocumentName: props.name,
    Signers: addressList,
  };

  return (
    <div>
      <div className={styles.parentDiv}>
        <div className={styles.headerStart}>
          <span>{i18next.t("enterData.title")}</span>
        </div>

        {addressList.map((x, i) => {
          return (
            <div className="box">
              <TextField
                className="textBox"
                id="address"
                name="Email"
                label={i18next.t("enterData.addressTextBox")}
                value={x.Email}
                onChange={(e) => validateEmail(e, i)}
                margin="none"
                fullWidth
              />

              <div className="btn-box">
                {addressList.length !== 1 && (
                  <DefaultButton className={styles.btnAddRemove} onClick={() => handleRemoveClick(i)}>
                    Remove
                  </DefaultButton>
                )}
                {addressList.length - 1 === i && (
                  <DefaultButton className={styles.btnAddRemove} onClick={handleAddClick}>
                    Add
                  </DefaultButton>
                )}
              </div>
            </div>
          );
        })}

        <div className={styles.textBoxesParent}>
          <div className={styles.buttonChoice}>
            <PrimaryButton
              disabled={!emailsValid || addressList.length < 1}
              onClick={() => {
                props.navigatorFunction(["sendDataMultiple", data]);
              }}
            >
              {i18next.t("enterData.sendButton")}
            </PrimaryButton>

           
          </div>
          {(!emailsValid || addressList.length < 1) && <div className={styles.notValid}>{i18next.t("enterData.notValidEmail")}</div>}
        </div>
      </div>
    </div>
  );
};

export default EnterDataMultiple;
