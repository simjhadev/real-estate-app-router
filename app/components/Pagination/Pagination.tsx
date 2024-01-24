"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/AppContext/AppContext';

import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';
//import { Center, Spacer, Flex } from '@chakra-ui/react';
import { createQueryParams } from '@/app/utils/createQueryParams';

type PaginationProps = {
    totalProperties: number;
    offset: number;
    propertyStatus: string;
    location: string;
    bdmin: number;
    bdmax: number;
    pmax: number;
    pmin: number;
    limit: number;
}

const Pagination = ({totalProperties, offset, propertyStatus, location, bdmin, bdmax, pmax, pmin, limit}: PaginationProps) => {

    const currentOffset = offset;
    const pLimit = limit;
    const [ disablePrev, setDisablePrev ] = useState(((currentOffset - pLimit) < 0) ? true : false);
    const [ disableNext, setDisableNext ] = useState(((currentOffset + pLimit) > totalProperties) ? true : false);

    const { setPropertyListLoadingStatus } = useAppContext();
    
    
    const router = useRouter();
    //console.log(currentOffset, pLimit, (currentOffset - pLimit));
     //console.log(disablePrev, disableNext);

    useEffect(() => {
            
        if( (currentOffset + pLimit) > totalProperties ){
          setDisableNext(true);
        }
        else{
          setDisableNext(false);
        }

        if( (currentOffset - pLimit) < 0 ){
          setDisablePrev(true);
        }
        else{
          setDisablePrev(false);
        } 
      
    },[offset])



    const prevClickHandler = () => {
      setPropertyListLoadingStatus(true);
      
      if(disablePrev === false){
        const prevOffset = currentOffset - pLimit;
        if( prevOffset >= 0 ){
          console.log("Prev Click handler");
          router.push("/search?"+createQueryParams(
            {status : propertyStatus, 
            location : location, 
            locRadius: "1", 
            offset: prevOffset+"", 
            bdmin: bdmin+"", 
            bdmax: bdmax+"", 
            pmax: pmax+"", 
            pmin: pmin+""}))
        }
      }
    }

    const nextClickHandler = () => {
      setPropertyListLoadingStatus(true);
     
      if(disableNext === false){
        const nextOffset = currentOffset + pLimit;
        console.log("Next Click handler");
        router.push("/search?"+createQueryParams(
            {status : propertyStatus, 
            location : location, 
            locRadius: "1", 
            offset: nextOffset+"", 
            bdmin: bdmin+"", 
            bdmax: bdmax+"", 
            pmax: pmax+"", 
            pmin: pmin+""}))
      }
    }

    
    return(
        <div className="w-full mb-5">
          <div className="flex w-[10%] m-auto">

            <IoChevronBackCircleSharp  className="mr-5 mt-5" size='30px' 
            style ={ disablePrev ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
            cursor='pointer'
            onClick={prevClickHandler} 
            />
           
            

            <IoChevronForwardCircleSharp className="ml-5 mt-5" size='30px' 
            style ={ disableNext ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
            cursor='pointer' 
            onClick={nextClickHandler}/>

          </div>
          
        </div>
    );
}

export default Pagination;