import axios from 'axios';

export const fetchAutocompleteCity = async (inputTxt : string) => {
    console.log("fetchAutocompleteCity");
    const options = {
      method: 'GET',
      url: 'https://'+process.env.GEOAPIFY_HOST+'/v1/geocode/autocomplete?text='+inputTxt+'&type=city&limit=10&format=json&filter=countrycode:us&apiKey='+process.env.GEOAPIFYAPI_KEY,
      headers: {}
    };
    try{
  
      const data = await axios.request(options);
      console.log(data);
      return data.data;
    }
    catch(error){
      console.error(error);
    }
  }
  


export const fetchAutocompleteZipcode = async (inputTxt : string) => {
  console.log("fetchAutocompleteZipcode");
  const options = {
    method: 'GET',
    url: 'https://'+process.env.GEOAPIFY_HOST+'/v1/geocode/autocomplete?text='+inputTxt+'&type=postcode&limit=10&format=json&filter=countrycode:us&apiKey='+process.env.GEOAPIFYAPI_KEY,
    headers: {}
  };
  try{

    const data = await axios.request(options);
    //console.log(data);
    return data.data;
  }
  catch(error){
    console.error(error);
  }


}

export const fetchAutocompleteAddress = async (inputTxt : string) => {
  console.log("fetchAutocompleteAddress");
  const options = {
    method: 'GET',
    url: 'https://'+process.env.GEOAPIFY_HOST+'/v1/geocode/autocomplete?text='+inputTxt+'&limit=10&format=json&filter=countrycode:us&apiKey='+process.env.GEOAPIFYAPI_KEY,
    headers: {}
  };
  try{

    const data = await axios.request(options);
    console.log(data);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}
