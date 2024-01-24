import { ReactElement } from 'react';
import ListingStatusFilterOptions from "../ListingStatus/ListingStatusFilterOptions";
import BedFilterOptions from "../Bed/BedFilterOptions";
import PriceFilterOptions from "../Price/PriceFilterOptions";
import { ListingStatus, bedRange, PriceRange } from "@/app/modals/PropertyFilter";

//import {VStack, StackDivider, Text, Button} from '@chakra-ui/react';
interface FilterOptionsProps{
    onListingStatusChange: (listingStatusVal:string) => void;
    listingStatus: ListingStatus;
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange: bedRange;
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
    onSearch:(e: React.MouseEvent<HTMLButtonElement>)=>void;
}

interface FilterContainerProps{
    children: ReactElement;
    filterName: string;
}

const FilterContainer = ({children, filterName} : FilterContainerProps) => {
    return(
        <div className="flex flex-col grow pt-2 pb-2">
            <p className="text-blue-500 font-semibold pb-2">{filterName}</p>
            {children}
            <hr className='mt-2'/>
        </div>
        );
}

const FilterOptions = ({onListingStatusChange, listingStatus, onBedRangeChange, bedCountRange,
                        onPriceRangeChange, priceRange, onSearch} : FilterOptionsProps) => {
    return (
        <div className='flex flex-col p-4'>
            <FilterContainer filterName="Listing Status"> 
                <ListingStatusFilterOptions onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}/>
            </FilterContainer>
                
            <FilterContainer filterName="Bedroom">            
                <BedFilterOptions onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}/>
            </FilterContainer>
            <FilterContainer filterName="Price"> 
                <PriceFilterOptions onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}/>
            </FilterContainer>
            <button className=" w-[200px] p-2 text-md bg-blue-200 hover:bg-blue-200  rounded-lg" onClick={onSearch}>
                Search
            </button>
        </div>
    );
}

export default FilterOptions;