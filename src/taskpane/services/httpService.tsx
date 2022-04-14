import axios, { AxiosResponse } from "axios";
import { GetAttachmentsRequest } from "../models/GetAttachmentsRequest";
import { GetAttachmentsResponse } from "../models/GetAttachmentsResponse";
import { SendFileToSign, SendFileToSignMultiple } from "../models/SendFileToSignRequest";

export class HttpClient {
  baseUrlMyApi = "https://mdodevski.vizibit.eu";
 // baseUrlMyApi = "https://localhost:7183";

  baseUrlSignumId = "https://test.signumid.hr";

  async getAttachments(request: GetAttachmentsRequest) {
    const res = await axios
      .post<GetAttachmentsRequest, AxiosResponse<GetAttachmentsResponse[]>>(
        this.baseUrlMyApi + "/getAttachments",
        request
      );
    return res.data;

  }

  async prepareFileForSigning(file: string) {
    var request = {
      data: file,
    };

    const res = await axios
      .post<GetAttachmentsResponse, AxiosResponse<any>>(this.baseUrlSignumId + "/v/1/rms", request);
    return res.data;
  }

  async sendFileToSignMultiple(request: SendFileToSignMultiple) {
    console.log(request);
    const res = await axios
      .post<SendFileToSignMultiple, AxiosResponse<any>>(this.baseUrlSignumId + "/v/1/signature/workflow/pdf/sequential", request);
    return res.data;
  }

  async sendFileToSign(request: SendFileToSign) {
    const res = await axios
      .post<SendFileToSign, AxiosResponse<any>>(this.baseUrlSignumId + "/v/1/signature/workflow/pdf/single", request);
    return res.data;
  }
}
