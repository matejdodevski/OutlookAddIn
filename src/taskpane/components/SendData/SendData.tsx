import { Button, DefaultButton, SpinButton } from "@fluentui/react";
import React, { useState, useEffect } from "react";
import styles from "./SendData.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Box, LinearProgress } from "@material-ui/core";
import i18next from "i18next";
import { AppProps } from "../../models/AppProps";
import { HttpClient } from "../../services/httpService";

library.add(faFilePdf);

export const SendData: React.FC<AppProps> = (props) => {
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
      Signer: props.data.Signer,
      Initiator: { Email: userEmail },
    };
    console.log(request)
    httpClient.sendFileToSign(request).then((responseData) => {
      setStatus(true);
      setLoaded(true);
      if(request.Signer.Email === request.Initiator.Email)
      {
        window.open(responseData.Url, "_blank");
      
        props.navigatorFunction(["chooseOption"]);
      }

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

export default SendData;
