import { Button, DefaultButton, SpinButton } from "@fluentui/react";
import React, { useState, useEffect } from "react";
import styles from "./SendDataMultiple.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Box, LinearProgress, TextareaAutosize, TextField } from "@material-ui/core";
import i18next from "i18next";
import { AppProps } from "../../models/AppProps";
import { HttpClient } from "../../services/httpService";

library.add(faFilePdf);

export const SendDataMultiple: React.FC<AppProps> = (props) => {
  const [status, setStatus] = useState(null);
  const handleStatusInput = (e) => setStatus(e);
  const httpClient = new HttpClient();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    prepareFileForSending();
  }, []);

  function prepareFileForSending() {
    var userEmail = Office.context.mailbox.userProfile.emailAddress;
    var request = {
      Document: props.data.Document,
      DocumentName: props.data.DocumentName,
      Signers: props.data.Signers.filter((x) => (x.Email = x.Email.replace(/\s/g, "") !== "")),
      Initiator: { Email: userEmail },
    };
    // http request to send an email with the prepared document to sign
    httpClient.sendFileToSignMultiple(request).then(() => {
      setStatus(true);
      setLoaded(true);
    });
  }

  return (
    <div>
      {/* renders if the method 'sendFileToSign' has returend a value */}
      {!loaded && (
        <Box sx={{ width: "100%", marginTop: "10px" }}>
          <LinearProgress />
        </Box>
      )}
      {/* renders if the method 'sendFileToSign' has returend a value */}
      {status && (
        <div className={styles.headerStart}>
          <span>{i18next.t("sendData.titleSuccessful")}</span>
        </div>
      )}
      {status === false && (
        <div className={styles.headerStart}>
          <span>{i18next.t("sendData.titleUnsuccessful")}</span>
        </div>
      )}

      {loaded && (
        <div>
          <div className={styles.buttonChoice}>
            <DefaultButton onClick={() => props.navigatorFunction(["chooseSign"])}>
              {i18next.t("sendData.signButton")}
            </DefaultButton>
          </div>
          <div className={styles.buttonChoice}>
            <DefaultButton onClick={() => props.navigatorFunction(["chooseSend"])}>
              {i18next.t("sendData.sendButton")}
            </DefaultButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendDataMultiple;
