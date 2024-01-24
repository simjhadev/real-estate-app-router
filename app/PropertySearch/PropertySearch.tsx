"use client";

import { useState, useEffect, useRef } from 'react';
import AutoSuggestion from '../components/AutoSuggestion/AutoSuggestion';
import { fetchAutocompleteZipcode, fetchAutocompleteCity, fetchAutocompleteAddress } from '@/app/utils/fetchAutocompleteAddress';
import { useRouter } from 'next/navigation';
import { createQueryParams } from '@/app/utils/createQueryParams';
import { getCookie } from '../utils/cookieFunctionClientSide';
import { createCookie } from '../ServerActions/CookiesSA';
import { revalidatePath } from 'next/cache';

interface PropertySearchProps{
    location : string;
}

export default function PropertySearch({ location }: PropertySearchProps){

    const [address, setAddress] = useState(location);
    const [addressList, setAddressList] = useState([]);
    const router = useRouter();

    // when the address in the input box changes, it will trigger useEffect which will fetch address List for Auto complete address bar

    useEffect(() => {
        if( address !== location){
        console.log("Address", address);
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

    const searchHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        //create Last Search Location cookie.
        const createCookieWithArgs = createCookie.bind(null, "lastSearchLoc",address);
        createCookieWithArgs();
         
        //setLastSearchedLoc(address);
        router.push('/search?'+ createQueryParams(
            {status : "for_sale", 
            location : address, 
            locRadius: "1", 
            offset: "0", 
            bdmin: "0", 
            bdmax: "0", 
            pmax: "0", 
            pmin: "0"}));
        
        //revalidatePath('/', 'layout');
    }

    return(
        <div className="relative w-full ">
            <div className="flex">
            <div className='relative w-full'>
            <AutoSuggestion address={address} addressList={addressList} onAddressInputChange={setAddress} />
            </div>
                <button type="button" 
                    className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    onClick={searchHandler}
                >
                Search
                </button>
            </div>  
        </div>
    )
}