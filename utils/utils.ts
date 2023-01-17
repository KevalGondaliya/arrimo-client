import axios from "axios";

export function apiCall(
  requestMethod: any,
  url: any,
  data: any,
  onSuccess: any,
  onFailure: any
) {
  var formData: any = {
    method: requestMethod,
    url: url,
  };

  var formBody: any = data;

  if (data !== undefined && data !== "") {
    formData["data"] = formBody;
  }
  try {
    axios(formData)
      .then((response) => response)
      .then((responseJson) => {
        if (responseJson) {
          onSuccess(responseJson);
        } else {
          onFailure(responseJson);
        }
      })
      .catch((e) => {
        onFailure(e.response.data);
      });
  } catch (e) {
    console.log("server disconnected");
  }
}
