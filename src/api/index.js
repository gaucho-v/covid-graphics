import axios from 'axios';
import { API_URL } from '../contants';

const DataApi = {
  getStats: async () => {
    try {
      const { data: dataString } = await axios.get(API_URL);
      // find beginning of the text contents
      const dataContent = dataString.substring(dataString.indexOf('{'));
      const data = JSON.parse(dataContent);
      const { cities, countries, russianSubjects } = data;
      return { cities: cities.data, countries: countries.data, regions: russianSubjects.data };
    } catch (e) {
      console.log(e);
      return {};
    }
  },
};

export default DataApi;