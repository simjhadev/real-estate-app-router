"use client"

import { useState, useEffect } from 'react';
import PropertyList from '../ui/PropertyList/PropertyList';
import Pagination from '../components/Pagination/Pagination';
import { PropertyDataType } from '../modals/PropertyDataType';

import { useAppContext } from '../AppContext/AppContext';

interface PropertyListContainerProps{
    propertyData : Array<PropertyDataType>;
    totalProperties: number;
    offset: string;
    propertyStatus: string;
    location: string;
    bdmin: string;
    bdmax: string;
    pmax: string;
    pmin: string;
    
}

export const PropertyListContainer = ({propertyData, totalProperties, offset, propertyStatus, location, bdmin, bdmax, pmax, pmin}: PropertyListContainerProps) => {
    const [ pgLoading, setPgLoading ] = useState(false);

    const { propertyListLoadingStatus, setPropertyListLoadingStatus } = useAppContext();

    useEffect(()=>{
        setPropertyListLoadingStatus(false);
        //console.log("sdgfhsjd");
    },[offset, propertyData]);

    return(
    <>
    <div className='relative w-[80vw] md:w-[91vw] xl:w-[92vw] m-auto'>
        {propertyListLoadingStatus ? <div className="absolute w-[80vw] md:w-[91vw] xl:w-[92vw] h-full bg-gray-200/50 z-50"></div> : null}
        <PropertyList propertyListInfo={propertyData}/>
    </div>
    
    <Pagination totalProperties={20} offset={parseInt(offset)} propertyStatus={propertyStatus} location={location} bdmin={parseInt(bdmin)} bdmax={parseInt(bdmax)} pmax={parseInt(pmax)} pmin={parseInt(pmin)} limit={6} />
    </>
    )
}