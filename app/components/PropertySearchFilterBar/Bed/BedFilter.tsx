import CustomPopover from '../CustomPopover';
import { bedRange } from '@/app/modals/PropertyFilter';
import BedFilterOptions from './BedFilterOptions';

interface BedFilterProps{
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange : bedRange;
}

const BedFilter = ({onBedRangeChange, bedCountRange}: BedFilterProps) => {
    
    const { displayTxt='' } = bedCountRange;

    return(
        <CustomPopover filterName={displayTxt} popoverHeader='Bedrooms'>
            <BedFilterOptions onBedRangeChange={onBedRangeChange}
            bedCountRange={bedCountRange}/>
        </CustomPopover>
    )
};

export default BedFilter;