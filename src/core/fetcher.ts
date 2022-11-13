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

  async getSearch(keyword: string) {
    try {
      let { data } = await axios.get('/api/search?q=' + String(keyword));

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new Fetcher();