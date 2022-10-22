import axios from 'axios';

class Fetcher {
  async getHome(key: string) {
    try {
      let { data } = await axios.get('/api/home?page=' + Number(key.split("-").slice(-1)[0]));

      return data;
    } catch (error) {
      return error;
    }
  }

  async getExplorer() {
    try {

    } catch (error) {

    }
  }
}

export default new Fetcher();