import { toast } from "react-toastify";
import { getLocalStorageValue } from "@/utils/localStorage";

export const headers: any = {
  "Content-Type": "application/json",
  accept: "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "access-control-allow-credentials": true,
  "Access-Control-Allow-Methods": "POST, GET, DELETE",
  "Access-Control-Request-Method": "POST, GET, DELETE",
  "Access-Control-Request-Headers": "POST, GET, DELETE",
};
const token = getLocalStorageValue();

export function apiCall(
  requestMethod: any,
  url: any,
  body: any,
  onSuccess: any,
  onFailure: any
) {
  if (token !== null) {
    headers["Authorization"] = "Bearer " + token;
  }
  let formData: any = {
    method: requestMethod,
    headers: headers,
  };
  let formBody: any = JSON.stringify(body);

  if (body !== undefined && body !== "") {
    formData["body"] = formBody;
  }

  fetch(url, formData)
    .then((response) => {
      response
        .json()
        .then((responseJson) => {
          if (responseJson.status === 200) {
            onSuccess(responseJson);
          } else {
            onFailure(responseJson);
          }
        })
        .catch((error) => {
          toast.error(error);
          onFailure(error);
        });
    })
    .catch((error) => {
      toast.error(error);
      onFailure(error);
    });
}
