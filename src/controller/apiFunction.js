
import axios from "axios";

const domain = "https://api1.uniconsults.com/api/profile?";


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
