"use client"

import { useState, useEffect } from 'react';

//import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/app/AppContext/AppContext';

import PropertySearchFilterOptions from './PropertySearchFilterOptions';
import { fetchAutocompleteZipcode, fetchAutocompleteCity, fetchAutocompleteAddress } from '@/app/utils/fetchAutocompleteAddress';

import { setListingStatusState, setBedBathState, setPriceState, setDisplayTxtForPrice} from './UtilityFunctionsForFilterSearch';
import { ListingStatus, bedRange, PriceRange, searchQueryParams } from "@/app/modals/PropertyFilter";
import { createQueryParams } from '@/app/utils/createQueryParams';

import { createCookie } from '@/app/ServerActions/CookiesSA';

import { revalidatePath } from 'next/cache';

interface PropertySearchFilterBarProps{
    propertyStatus: string;
    location: string;
    bdmin: string;
    bdmax: string;
    pmax: string|null;
    pmin: string|null;
}

const PropertySearchFilterBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get("status") ? searchParams.get("status")+"" : "for_sale";
    const location = searchParams.get("location")+"";
    const locRadius = "1";
    const offset = "0";
    const bdmin = searchParams.get("bdmin") ? searchParams.get("bdmin")+"" : "0";
    const bdmax = searchParams.get("bdmax") ? searchParams.get("bdmax")+"" : "0";
    const pmin = searchParams.get("pmin") ? searchParams.get("pmin")+"" : "0";
    const pmax = searchParams.get("pmax") ? searchParams.get("pmax")+"" : "0";

    //console.log("Search Params", searchParams.get("bdmin"));

    

    const [listingStatus, setListingStatus] = useState(setListingStatusState(status));

    const [bedCountRange, setBedCountRange] = useState(setBedBathState(bdmin, bdmax, "Beds"));
    const [priceRange, setPriceRange] = useState(setPriceState(pmin, pmax));
    
    const [address, setAddress] = useState(location);
    const [addressList, setAddressList] = useState([]);

    const {setPropertyListLoadingStatus } : any = useAppContext();
    

    

    useEffect(()=>{
        listingStatusChangeHandler(status);
    },[status]);

    // when the address in the input box changes, it will trigger useEffect which will fetch address List for Auto complete address bar

    useEffect(() => {
        if( address !== location){
        //console.log("Address", address);
        const delayDebounceFn = setTimeout(() => {
            if(address.length > 3){
                //console.log("Api call");
                const wordCount = address?.trim().split(/[,\s]/).length;
                if(wordCount == 1){
                    if(typeof(address.trim()) === "number"){
                        fetchAutocompleteZipcode(address?.trim()).then((data)=>{
                        setAddressList(data.results?.map((result:any)=>result.postcode));
                        })
                        .catch((error) => {
                            setAddressList([]);
                        }); 
                    }
                    else{
                        fetchAutocompleteCity(address?.trim()).then((data)=>{                        
                        setAddressList(data.results?.map((result:any) => result.address_line1));
                        })
                        .catch((error) => {
                            setAddressList([]);
                        }); 
                    }
                }
                else{
                    fetchAutocompleteAddress(address?.trim()).then((data)=>{
                    //console.log(data);
                    setAddressList(data.results?.map((result:any)=>(result.address_line1+" "+ result.address_line2)));
                    })
                    .catch((error) => {
                        setAddressList([]);
                    });  
                }
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);

        }
    },[address]);



    
    const listingStatusChangeHandler = (listingStatusVal: string) => {
        
        switch(listingStatusVal){
            case 'for_sale' :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: 'for_sale', 
                    displayTxt: 'For Sale'
                }));
                break;

            case 'for_rent' :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: 'for_rent', 
                    displayTxt: 'For Rent'
                }));
                break;
                
            default :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: '', 
                    displayTxt: 'Listing Status'
                }));
        }
    }

    const rangeChange = (prevRange:bedRange, selectedVal:string, selectType:string, rangeType:string) => {
        let minVal, maxVal, newRange;

        minVal = (rangeType === "RangeStart") ? selectedVal : prevRange.min;
        maxVal = (rangeType === "RangeTo") ? selectedVal : prevRange.max;

        if(minVal !== "0" && maxVal !== "0"){
            if(rangeType === "RangeStart"){
                maxVal = parseFloat(minVal) > parseFloat(maxVal) ? minVal : maxVal;
            }
            if(rangeType === "RangeTo"){
                minVal = parseFloat(maxVal) < parseFloat(minVal) ? maxVal : minVal;
            }
        }

        newRange = setBedBathState(minVal, maxVal, "Beds");

        return {
            ...prevRange,
            ...newRange
        };
    }

    const onBedRangeChangeHandler = (selectedVal:string, selectedType:string) => {
     
        switch(selectedType){
            case 'RangeStart' :
                setBedCountRange( (prevRange) => rangeChange(prevRange, selectedVal, "Beds", selectedType));
            break;

            case 'RangeTo' :
                setBedCountRange( prevRange => rangeChange(prevRange, selectedVal, "Beds", selectedType));
            break;

            default :
                setBedCountRange(  prevRange => ({
                    ...prevRange,
                    min: "0",
                    max: "0",
                    displayTxt: "Beds"
                }));
        }
    }

const onPriceRangeChangeHandler = (selectedVal:string, selectedType:string) => {
        
        switch(selectedType){
            case 'MinVal' :
                setPriceRange( prevRange => ({
                    ...prevRange,
                    min: selectedVal,
                    displayTxt: setDisplayTxtForPrice(selectedVal,prevRange.max),
                }));
            break;

            case 'MaxVal' :
                setPriceRange( prevRange => ({
                    ...prevRange,
                    max: selectedVal,
                    displayTxt: setDisplayTxtForPrice(prevRange.min, selectedVal),
                }));
            break;

            default :
             setPriceRange(  prevRange => ({
                    ...prevRange,
                    min: "0",
                    max: "0",
                    displayTxt: "Price"
                }));
        }
    }

    

    const searchHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        setPropertyListLoadingStatus(true);

        //create Last Search Location cookie.
        const createCookieWithArgs = createCookie.bind(null, "lastSearchLoc",address);
        createCookieWithArgs();

        router.push('/search?'+ createQueryParams(
            {status : listingStatus.statusVal, location : address, 
            locRadius: "1", 
            offset: "0", 
            bdmin: bedCountRange.min, 
            bdmax: bedCountRange.max, 
            pmin: priceRange.min+"", 
            pmax: priceRange.max+""}));
        
        //revalidatePath('/', 'layout');
    }
    
    return(

        <div>
            
            <PropertySearchFilterOptions 
                onSearch={searchHandler}
                onListingStatusChange={listingStatusChangeHandler}
                listingStatus={listingStatus} 
                onBedRangeChange={onBedRangeChangeHandler}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChangeHandler}
                priceRange={priceRange}
                onAddressInputChange={setAddress}
                address={address}
                addressList={addressList}
            />
        </div>
    )
} 

export default PropertySearchFilterBar;