import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  headers: {
    lang: process.env.NEXT_PUBLIC_APP_EN_LANG,
    versioncode: process.env.NEXT_PUBLIC_APP_VERSION_CODE,
    clienttype: process.env.NEXT_PUBLIC_APP_CLIENT_TYPE,
  },
});

export default instance;