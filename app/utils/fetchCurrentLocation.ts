
import axios from 'axios';


export const fetchCurrentLocation = async () => {
    const options = {
      method: 'GET',
      url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
      params: {apikey: process.env.RAPIDAPI_CURRENTLOCATION_API_KEY},
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_CURRENTLOCATION_API_HOST,
        'Cookie': 'currentLoc=test;path=/'
      }
    };
    console.log(options);
    try{
      const data = await axios.request(options);
      //const createCookieWithArgs = createCookie.bind(null, "currentLoc","test");
      //createCookieWithArgs();
      console.log(data.data);
      return data.data;
    }
    catch(error){
      console.error(error);
    }
  }
  