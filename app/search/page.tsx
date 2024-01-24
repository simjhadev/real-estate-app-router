import { PropertyDataType } from "../modals/PropertyDataType";
import { Suspense } from "react";
//import { pData } from '../modals/PropertyDataArray';

import { fetchProperties } from '../utils/fetchProperties';
import PropertySearchFilterBar from "../components/PropertySearchFilterBar/PropertySearchFilterBar";
import PropertyListLoading from "../ui/LoadingComponents/PropertyListLoading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { PropertyListContainer } from "./PropertyListContainer";

interface tempObjType{
    min?: number;
    max?: number;
}

function timeout(delay: number){
  return new Promise(res => setTimeout(res, delay));
}

export default async function SearchPage({searchParams}: {
    searchParams: { [key: string]: string | undefined }
  }) {

    //console.log(searchParams);

let prDtls = null, totalProperties;
  let apiError = "";

  const createMaxMinObj = (minVal:string, maxVal:string) =>{
    if(minVal === "0" && maxVal === "0" ){
      return null;
    }
    else{
      let tempObj: tempObjType={};
      if(maxVal !== "0") tempObj.max = parseFloat(maxVal);
      if(minVal !== "0") tempObj.min = parseFloat(minVal);
      return tempObj;
    }
  };

    let propertyData : Array<PropertyDataType> = [];
    /* await timeout(3000);
    propertyData =pData; */
    
        let {
            limit = "6",
            status = "for_sale", 
            location  = "", 
            locRadius = "1",
            bdmin = "0",
            bdmax = "0",
            pmin = "0",
            pmax = "0",
            offset = "0"} = {...searchParams};
        
        
            const beds = createMaxMinObj(bdmin,bdmax);
            const list_price = createMaxMinObj(pmin,pmax);
            
        
            

        const resfetchProperties = await fetchProperties({limit: parseInt(limit+""), offset: parseInt(offset+""), search_location:{location: location, radius: parseInt(locRadius)}, beds ,status});
        if(resfetchProperties.responseCode !== 200)
          throw new Error("Unable to fetch data");
        
        try{
        //console.log("Search Page Indexxxxxxxxxxxxxxxx Try block", res);
  
        if(resfetchProperties.responseCode === 200 && resfetchProperties.data.data.home_search !== null){
            totalProperties = resfetchProperties.data.data.home_search?.total;
            console.log(totalProperties);
          //const propertyData = resfetchProperties.data;
          //apiError = resfetchProperties.responseCode;
          if(totalProperties > 0){
        
            propertyData = resfetchProperties.data.data.home_search?.results?.map((result: any)=>({
            property_id : result?.property_id,
            coverPhoto: result?.primary_photo?.href ? (result?.primary_photo?.href).slice(0,-5)+"od-w1024_h768_x2.webp" : null,
            coverPhotoLowRes: result?.primary_photo?.href ? result.primary_photo.href : null,
            prop_type: ((result?.description?.type).replace("_"," ")).replace(/(\w)(\w*)/g,function(g0:string,g1:string,g2:string){return g1.toUpperCase() + g2.toLowerCase();}),
            price: result?.list_price ? ("$" + new Intl.NumberFormat().format(result?.list_price)) : null,
            beds: result?.description?.beds,
            baths: result?.description?.baths,
            sqft: result?.description?.sqft,
            address: ([result?.location?.address?.line,",",result?.location?.address?.city,",",result?.location?.address?.state_code, result?.location?.address?.postal_code]).join(" "),
            estimate: result?.estimate?.estimate ? ("$" + new Intl.NumberFormat().format(result?.estimate?.estimate)) : null,
            }));
          }
        }
        else{

        }
      }
      catch(error){
        console.log("Search Page Index Catch Blockkkkkkkkkkkkkkkkkk", error);
        console.log(error);
        //apiError = error;
      }

    
    return(
      <div className="w-full pt-10">
       
        <Suspense fallback={<PropertyListLoading count={6} />}>

          <PropertyListContainer propertyData={propertyData} totalProperties={20} offset={offset} propertyStatus={status} location={location} bdmin={bdmin} bdmax={bdmax} pmin={pmin} pmax={pmax} />
          
        </Suspense> 
                     
      </div>
     
            
    )
}

{/* <>
      <PropertySearchFilterBar />
        <div className="pt-20 font-semibold text-xl text-blue-500">
        Home For You
        </div>
        <div className="pb-2 text-gray-400">
        Based on your Search 
        </div>
        <hr className="border-2" />
      
        <div className="w-full pt-10">
       
        <Suspense fallback={<PropertyListLoading count={6} />}>

          <PropertyListContainer propertyData={propertyData} totalProperties={20} offset={offset} propertyStatus={status} location={location} bdmin={bdmin} bdmax={bdmax} pmin={pmin} pmax={pmax} />
          
        </Suspense> 
                     
        </div>     
      
      </> */} 