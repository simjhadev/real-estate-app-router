"use client";
import ListingStatusFilter from "../ListingStatus/ListingStatusFilter";
import BedFilter from "../Bed/BedFilter";
import PriceFilter from "../Price/PriceFilter";
import { ListingStatus, bedRange, PriceRange } from "@/app/modals/PropertyFilter";

interface FilterLayoutForDesktopProps{
    onListingStatusChange: (listingStatusVal:string) => void;
    listingStatus: ListingStatus;
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange: bedRange;
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
    onSearch:(e: React.MouseEvent<HTMLButtonElement>)=>void;
}

export default function FilterLayoutForDesktop({onListingStatusChange, listingStatus, onBedRangeChange, bedCountRange,onPriceRangeChange, priceRange, onSearch}: FilterLayoutForDesktopProps){
    return(
        <>
            <ListingStatusFilter 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
            />
            <BedFilter 
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
            />
            <PriceFilter 
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
            />
            <button className="bg-blue-200 hover:bg-blue-300 p-2 text-sm font-semibold rounded-lg pl-4 pr-4" onClick={onSearch}>
                Search
            </button>
        </>
    )
}