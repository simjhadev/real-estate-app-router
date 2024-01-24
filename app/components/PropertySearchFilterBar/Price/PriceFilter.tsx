import CustomPopover from '../CustomPopover';
import PriceFilterOptions from './PriceFilterOptions';
import { PriceRange } from '@/app/modals/PropertyFilter';

interface PriceFilterProps{
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
}

const PriceFilter = ({onPriceRangeChange, priceRange}:PriceFilterProps) => {
    
    const { displayTxt="" } = priceRange;

    return(
        <CustomPopover filterName={displayTxt} popoverHeader='Price'>
            <PriceFilterOptions onPriceRangeChange={onPriceRangeChange}
            priceRange={priceRange}/>
        </CustomPopover>
    )
};

export default PriceFilter;