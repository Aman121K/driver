import axios from 'axios';
// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://driversuvidha.xyz/CRM/api',
  timeout: 500000, //Timeout: 1000 * 200, //(1000*5 = 5 sec)
});

// Set JSON Web Token in Client to be included in all calls
// export const setClientToken = token => {
//   APIKit.interceptors.request.use(function(config) {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };
export default APIKit;