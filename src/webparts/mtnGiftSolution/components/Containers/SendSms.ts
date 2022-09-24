import {
    HttpClient,
    IHttpClientOptions,
    HttpClientResponse,
  } from "@microsoft/sp-http";
  import swal from "sweetalert";
  import { useHistory } from "react-router-dom";
  
  export const sendSMS = (
    mobileNumber,
    EmployeeName,
    context,
    id,
    message,
    route,
    sms
  ) => {
    const history = useHistory();
    const postURL = "https://mtnsms.herokuapp.com/api/v1/sms%22";
    const httpClientOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer iCode`,
      },
      body: JSON.stringify({
        id: `3310232323${id}`,
        message: `Yello ${EmployeeName}, ${sms}`,
        mobile: [mobileNumber],
        sender: "Heroku",
      }),
      method: "POST",
      // mode: "no-cors",
    };

    return context.httpClient
      .post(postURL, HttpClient.configurations.v1, httpClientOptions)
      .then((response: Response): Promise<HttpClientResponse> => {
        swal("Success", message ?? "Success", "success");
        history.push(route ?? "/home");
        return response.json();
      });
    };