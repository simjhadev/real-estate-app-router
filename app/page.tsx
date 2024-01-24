import Image from 'next/image';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

import LandingPgPic from '../public/LandingPgPic.jpg';
import PropertySearch from './PropertySearch/PropertySearch';
import PropertyList from './ui/PropertyList/PropertyList';
import PropertyListLoading from './ui/LoadingComponents/PropertyListLoading';

import { PropertyDataType } from './modals/PropertyDataType'

//import { pData } from './modals/PropertyDataArray'


import { fetchCurrentLocation } from './utils/fetchCurrentLocation'
import { fetchProperties } from './utils/fetchProperties'
import { error } from 'console';

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}


export default async function Home() {

  const limit = 6, offset = 0, status ="for_sale", locRadius = "1";

  const cookieStore = cookies();
  let location : string | undefined ="";
  let lastSearchLoc : string | undefined = "";

  //location = cookieStore.get('currentLoc') === undefined ? "" : (cookieStore.get('currentLoc')?.value === undefined ? "" : cookieStore.get('currentLoc')?.value+"");
  location = cookieStore.get('currentLoc')?.value;
  lastSearchLoc = cookieStore.get('lastSearchLoc')?.value;

  console.log("Env Var", process.env.RAPIDAPI_KEY);
  
  let search_location = {
    location : location ? location : "",
    radius : parseInt(locRadius)
  };

  let propertyData : Array<PropertyDataType> = [];

 if(location === "" ){
    try{
      const locData = await fetchCurrentLocation();
      search_location.location = locData ? (locData.city + ", " + locData.zipCode) : "USA";
      
    }catch(error){
      console.log(error);
    }
    
  }

  

  
    const resfetchProperties = await fetchProperties({limit, offset, search_location, status});
    if(resfetchProperties.responseCode !== 200)
      throw new Error("Unable to fetch data");
    
    
    try{
    const totalProperties = resfetchProperties.data.data.home_search?.total
    if(totalProperties > 0){
      propertyData = resfetchProperties.data.data.home_search?.results?.map((result: any)=>({
          property_id : result?.property_id,
          coverPhoto: result?.primary_photo?.href ? (result?.primary_photo?.href).slice(0,-5)+"od-w1024_h768_x2.webp" : null,
          coverPhotoLowRes: result?.primary_photo?.href ? result.primary_photo.href : null,
          prop_type: ((result?.description?.type).replace("_"," ")).replace(/(\w)(\w*)/g,function(g1 : string, g2: string){return g1.toUpperCase() + g2.toLowerCase();}),
          price: result?.list_price ? ("$" + new Intl.NumberFormat().format(result?.list_price)) : null,
          beds: result?.description?.beds,
          baths: result?.description?.baths,
          sqft: result?.description?.sqft,
          address: ([result?.location?.address?.line,",",result?.location?.address?.city,",",result?.location?.address?.state_code, result?.location?.address?.postal_code]).join(" "),
          estimate: result?.estimate?.estimate ? ("$" + new Intl.NumberFormat().format(result?.estimate?.estimate)) : null,
      }));
      //console.log("PropertyData.............");
      //console.log(propertyData);
    }
  }
  catch(error){
    console.log("Index Catch Blockkkkkkkkkkkkkkkkkk", error);
    console.log(error);
  }
  /* await timeout(4000);
  propertyData = pData; */

  return (
  <>
    <div className="relative h-[60vh] w-full">

        <Image src={LandingPgPic}  
        fill={true}        
        style={{objectFit: "cover", objectPosition: "top"}}
        placeholder="blur"
        loading="lazy"
        alt="Landing Page Pic"
        className="z-0"/> 


        <div className="flex h-full w-full place-content-center" >
          <div className="flex flex-col self-center shrink-1 p-2 bg-white rounded-md w-[80%] md:w-[60%]">
              <PropertySearch location={search_location.location}/>
          </div> 
        </div> 
    </div>

    <div className="pt-20 font-semibold text-xl text-blue-500">
      Home For You
    </div>
    <div className="pb-2 text-gray-400">
      Based on your Search 
    </div>
    <hr className="border-2" />

    <div className="w-full pt-10">
      <Suspense fallback={<PropertyListLoading count={6} />} >
        <PropertyList propertyListInfo={propertyData} />
      </Suspense>
    </div>
  </>
  )
}
