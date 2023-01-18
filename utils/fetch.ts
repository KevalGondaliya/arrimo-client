import axios from "axios";
import { getLocalStorageValue } from "@/utils/localStorage";
import { apiUrl } from "@/utils/apiUrl";
import { createSelector } from "@reduxjs/toolkit";

// export async function fetcher(resource: string) {
//   console.log(resource);

//   let result;
//   try {
//     result = await fetch(resource);
//   } catch (e) {
//     console.error(e);
//     throw new Error("Invalid Response");
//   }
//   if (result?.ok) {
//     try {
//       return await result.json();
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     console.log(result.status, result.statusText);
//     throw result.statusText;
//   }
// }

export const fetcher = (url: any) => {
  const token = getLocalStorageValue();

  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);
};
