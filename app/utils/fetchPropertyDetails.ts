import axios from 'axios';
import { PropertyDetailsType } from '../modals/PropertyDataType';

export const fetchPropertyDetails = async (propertyId : String)=> {
    const params = {
      property_id : propertyId
    };
  
    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/detail',
      params: params, 
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_REALTY_US_HOST,
      }
    };
    let prDtls : PropertyDetailsType | null = null;
    
    try{
      const data = await axios.request(options);
      console.log(data);
      if(data.data.data.home !== null){
        const result = data.data.data.home;
            prDtls = {
            price: result?.list_price ? ("$" + new Intl.NumberFormat().format(result?.list_price)) : null,
            beds: result?.description?.beds,
            baths: result?.description?.baths,
            sqft: result?.description?.sqft,
            address: ([result?.location?.address?.line,",",result?.location?.address?.city,",",result?.location?.address?.state_code, result?.location?.address?.postal_code]).join(" "),
            estimate: result?.estimates?.current_values ? (result?.estimates?.current_values[0]?.estimate ? 
                      ("$" + new Intl.NumberFormat().format(result?.estimates?.current_values[0]?.estimate))
                      : null) : null,
            prop_type: ((result?.description?.type).replace("_"," ")).replace(/(\w)(\w*)/g,function(g0:string,g1:string,g2:string){return g1.toUpperCase() + g2.toLowerCase();}),
            year_built: result?.description?.year_built,
            heating: result?.description?.heating,
            cooling: result?.description?.cooling,
            parking: result?.description?.garage,
            hoa: result?.hoa?.fee,
            descriptionText: result?.description?.text,
            prop_details : result?.details,
            agents: result?.advertisers?.map((advertiser : {name: string; email: string})=>({
                      agentName : advertiser.name,
                      agentEmail : advertiser.email
                    })),
            photos: result?.photos?.map((photo: {href: string})=>(
                      (photo?.href).slice(0,-5)+"od-w1024_h768_x2.webp"
                    )),
            }
          //console.log(prDtls);
          
        }
        return {
          responseCode : data.status,
          data : prDtls
        };
    }
    catch(error: any){
      console.error(error);
      return {
        responseCode : error.response.status,
        data : null
      }
      
    }
    //return null;
  }