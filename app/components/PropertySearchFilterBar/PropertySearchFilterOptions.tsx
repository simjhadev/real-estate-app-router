"use client"

import FilterLayoutForDesktop from './FilterLayoutForDesktop/FilterLayoutForDesktop';
import FilterLayoutForMobTab from "./FilterLayoutForMobTab/FilterLayoutForMobTab";
import AutoSuggestion from '../AutoSuggestion/AutoSuggestion';
import { ListingStatus, bedRange, PriceRange } from "@/app/modals/PropertyFilter";
import { useMediaQuery } from '@/app/utils/CustomHooks/useChkIfMobile';



interface PropertyFilterSearchOptionsProps{
    onListingStatusChange: (listingStatusVal:string) => void;
    listingStatus: ListingStatus;
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange: bedRange;
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
    onSearch:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    onAddressInputChange: (address: string) => void;
    address: string;
    addressList: Array<string>;
 }


const PropertyFilterSearchOptions = ({onListingStatusChange, listingStatus,
     onBedRangeChange, bedCountRange,
     onPriceRangeChange, priceRange, onSearch, onAddressInputChange, address, addressList}:PropertyFilterSearchOptionsProps) => {

    const isMobile = useMediaQuery(768);
    //console.log(isMobile);

    return(
        
            <div className="flex w-full p-4 bg-slate-50 gap-2">
            <div className='relative w-[300px]'>
            <AutoSuggestion address={address} addressList={addressList} onAddressInputChange={onAddressInputChange} />
            </div>
            
            {isMobile ?
                <FilterLayoutForMobTab 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
                onSearch={onSearch}/>

                
            :
            <FilterLayoutForDesktop 
            onListingStatusChange={onListingStatusChange}
            listingStatus={listingStatus}
            onBedRangeChange={onBedRangeChange}
            bedCountRange={bedCountRange}
            onPriceRangeChange={onPriceRangeChange}
            priceRange={priceRange}
            onSearch={onSearch}/>
            }
            </div>
    )
} 

export default PropertyFilterSearchOptions;