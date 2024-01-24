import {RadioGroup, Radio} from "@nextui-org/react";
import {ListingStatus} from "../../../modals/PropertyFilter";

interface ListingStatusFilterOptionsProps{
    onListingStatusChange: (listingStatusVal:string) => void; 
    listingStatus: ListingStatus;
}

const ListingStatusFilterOptions = ({onListingStatusChange, listingStatus}: ListingStatusFilterOptionsProps) => {
    /** onChange={(e: React.FormEvent<HTMLInputElement>)=> onListingStatusChange(e.target.value)} */
    return(
        <RadioGroup  size="sm" defaultValue={listingStatus.statusVal} >
                <Radio value='for_sale' onChange={(e: React.ChangeEvent<HTMLInputElement>)=> onListingStatusChange(e.target.value)}>For Sale</Radio>
                <Radio value='for_rent' onChange={(e: React.ChangeEvent<HTMLInputElement>)=> onListingStatusChange(e.target.value)}>For Rent</Radio>   
        </RadioGroup>  
    )
};

export default ListingStatusFilterOptions;