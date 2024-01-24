import axios from 'axios';

interface fetchPropertiesParams {
    limit : number;
    offset : number;
    search_location: locationType;
    status: string;
    beds?: bedRange | null;
    list_price?: number;
}

interface locationType {
    location : string;
    radius : number;
}

interface ObjParams {
    limit : number;
    offset : number;
    search_location: Object;
    status: Array<string>;
    beds?: bedRange | null;
    sold_price?: number | null;
    sort: Object;
}

interface bedRange{
  min?: number;
  max?: number;
}

export const fetchProperties = async ({limit, offset, search_location, status, beds, list_price} : fetchPropertiesParams) => {
    const params : ObjParams = {
        limit : limit,
        offset : offset,
        status: [status],
        search_location: search_location,
        sort: {"direction":"desc","field":"list_date"}
    };

    if(beds !== null && beds !== undefined){
      params.beds = beds;
    }
    /* if(baths !== null){
      params.baths = baths;
    } */
    if(list_price !== null && list_price !== undefined){
      params.sold_price = list_price;
    }

   //console.log(params);
   

    const options = {
        method: 'POST',
        url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_REALTY_US_HOST,
        },
        data : params
        //data: '{"limit":10,"offset":0,"postal_code":"90004","status":["for_sale","ready_to_build"],"sort":{"direction":"desc","field":"list_date"}}'
      };

    try{
      //console.log("Environment Variable", process.env.RAPIDAPI_KEY);
        const data = await axios.request(options);
        
        console.log("fetchApiiiiiiiiiiiiii Try Block", data.status);
        //console.log(data);

        return {
          responseCode : data.status,
          data : data.data};
        
    }
    catch(error: any){
      console.log("fetchApiiiiiiiiiiiiii Catch Block", error.response.status);
        return {
          responseCode : error.response.status,
          data: ""
        };
    }
}