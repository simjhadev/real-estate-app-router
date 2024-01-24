//import CustomPopover from '../CustomPopover';
import CustomPopover from '../CustomPopover';
import ListingStatusFilterOptions from './ListingStatusFilterOptions';
import { ListingStatus } from '@/app/modals/PropertyFilter';

interface ListingStatusFilterProps{
    onListingStatusChange: (listingStatusVal:string) => void; 
    listingStatus: ListingStatus;
}

const ListingStatusFilter = ({onListingStatusChange, listingStatus}:ListingStatusFilterProps) => {
    
    return(
        <CustomPopover filterName={listingStatus.displayTxt} popoverHeader='Listing Status'>
            <ListingStatusFilterOptions onListingStatusChange={onListingStatusChange} listingStatus={listingStatus}/>
        </CustomPopover>
    )
};

export default ListingStatusFilter;