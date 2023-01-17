const fetch = require("isomorphic-unfetch");
const { genHostAwareUrl } = require("./url");

export default function makeSelfFetch(currentUrl) {
  if (!process.browser) {
    // return a  no-op function for server use
    return () => {
      throw new Error("cannot use self fetch on server");
    };
  }

  return (path, method, body) => {
    const headers = new Headers({
      Accept: "application/json",
    });

    if (method === "POST") {
      headers.append("Content-Type", "application/json");
    }

    let params = {
      method: method ? method : "GET",
      credentials: "include",
      headers,
    };

    if (body) {
      params = { ...params, body: JSON.stringify(body) };
    }

    return fetch(genHostAwareUrl(path, currentUrl, true), params)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        if (body.status === "success") {
          return body.data;
        } else {
          if (body.message) {
            throw new Error(body.message);
          }
          throw new Error("upstream request failed");
        }
      });
  };
}
