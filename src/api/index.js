import axios from 'axios';
import { API_URL } from '../contants';

const DataApi = {
  getStats: () => axios.get(API_URL).then(({ data: dataString }) => {
    // find beginning of the text contents
    const dataContent = dataString.substring(dataString.indexOf('{'));
    const data = JSON.parse(dataContent);
    const { cities, countries, russianSubjects } = data;
    return [
      ...cities.data.cities,
      ...countries.data.countries,
      ...russianSubjects.data.subjects,
    ];
  }).catch(e => {
    console.log(e);
    return {};
  }),
};

export default DataApi;