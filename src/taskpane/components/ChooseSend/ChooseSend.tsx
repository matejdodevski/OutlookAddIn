import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import styles from "./ChooseSend.module.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import i18next from "i18next";
import { Box, LinearProgress } from "@material-ui/core";
import { GetAttachmentsResponse } from "../../models/GetAttachmentsResponse";
import { GetAttachmentsRequest } from "../../models/GetAttachmentsRequest";
import { AppProps } from "../../models/AppProps";
import { HttpClient } from "../../services/httpService";
library.add(faFilePdf);

const serviceRequest: GetAttachmentsRequest = {
  AttachmentToken: "",
  EwsUrl: "",
  Attachments: [],
  State: 0,
};

export const ChooseSend: React.FC<AppProps> = (props) => {
  const [attachments, setAttachments] = useState<GetAttachmentsResponse[]>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const httpClient = new HttpClient();

  useEffect(() => {
    Office.context.mailbox.getCallbackTokenAsync((result) => {
      serviceRequest.AttachmentToken = result.value;
      serviceRequest.EwsUrl = Office.context.mailbox.ewsUrl;

      // Format the attachment details for sending.
      for (var i = 0; i < Office.context.mailbox.item.attachments.length; i++) {
        serviceRequest.Attachments[i] = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[i]));
      }

      // http request to get the attachments
      httpClient.getAttachments(serviceRequest).then((responseData) => {
        if (responseData.length == 1) {
          props.navigatorFunction(["enterData", responseData[0].fileBase64]);
        } else {
          setAttachments(responseData);
        }

        setLoaded(true);
      });
    });
  }, []);

  return (
    <div>
      {/* renders if the attachments haven't been retrieved yet */}
      {!loaded && (
        <Box sx={{ width: "100%", marginTop: "10px" }}>
          <LinearProgress />
        </Box>
      )}
      {/* renders if the attachments have been retrieved */}
      {attachments &&
        // renders if there is only one attachment
        ((attachments.length == 0 && (
          <div className={styles.parentDiv}>
            <br></br>
            <div className={styles.headerStart}>
              <span>{i18next.t("chooseSend.titleNoFiles")}</span>
            </div>
            <br></br>
            <div className={styles.title}>
              <span>{i18next.t("chooseSend.subtitleNoFiles")}</span>
            </div>
          </div>
        )) ||
          // renders if there is more than one attachment
          (attachments.length > 0 && (
            <div className={styles.parentDiv}>
              <div className={styles.headerStart}>
                <span>{i18next.t("chooseSend.title")}</span>
              </div>
              <div className={styles.title}>
                <span>{i18next.t("chooseSend.subTitle")}</span>
              </div>
              {attachments.map((attachment, index) => {
                return (
                  <div
                    key={index}
                    className={styles.buttonChoice}
                    onClick={() => {
                      props.navigatorFunction(["enterData", attachment.fileBase64, attachment.name]);
                    }}
                  >
                    <FontAwesomeIcon className={styles.icon} icon="file-pdf" />

                    <span className={styles.fileName}>{attachment.name}</span>
                  </div>
                );
              })}
              <span className={styles.title}>{i18next.t("chooseSend.note")}</span>
            </div>
          )))}
    </div>
  );
};

export default ChooseSend;
