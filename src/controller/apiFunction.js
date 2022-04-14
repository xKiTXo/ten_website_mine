import { updateMenu } from "../redux/actions";

import axios from "axios";

const domain = "https://api1.uniconsults.com/api/profile?";
export const getMenuData = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api1.uniconsults.com/api/menu/list/3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return resolve({ data: await res.json(), status: res.status });
        } else {
          return resolve({ status: res.status, msg: res.statusText });
        }
      })
      .catch((err) => reject(err));
  });
};
export const getGalleryData = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api1.uniconsults.com/api/gallery/list/3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return resolve({ data: await res.json(), status: res.status });
        } else {
          return resolve({ status: res.status, msg: res.statusText });
        }
      })
      .catch((err) => reject(err));
  });
};

export const getStoreInfo = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${domain}store_id=3`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
