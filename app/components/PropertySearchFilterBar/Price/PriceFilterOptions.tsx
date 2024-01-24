//import { HStack, Box, Select } from '@chakra-ui/react';
import { PriceRange } from "@/app/modals/PropertyFilter";

interface PriceFilterOptionsProps{
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
}

const PriceFilterOptions = ({onPriceRangeChange, priceRange}:PriceFilterOptionsProps) => {

    const priceOptions =['100000','200000','300000','400000','500000','600000','700000','800000','900000','1000000','1250000',
        '1500000','1750000','2000000','2250000','2500000','2750000','3000000','3250000','3500000','3750000','4000000'];
    
    //console.log(priceRange);
    const {min = '0', max = '0'} = priceRange;
    
    let minPriceOptions = [], maxPriceOptions = [];
    minPriceOptions = priceOptions.filter(price => (parseFloat(max+"") > 0) ? (parseFloat(price) <= parseFloat(max+"")) : true);
    //console.log("min Price" + minPriceOptions);
    
    maxPriceOptions = priceOptions.filter(price => (parseFloat(min+"") > 0) ? (parseFloat(price) >= parseFloat(min+"")) : true);
    //console.log("max Price" + maxPriceOptions);

    const selectClassName = "p-2 pl-3 pr-3 text-sm border-1 rounded-md border-slate-300 focus:border-blue-300"
    
    return(
    <div className="flex gap-2">
            <div>Min:
                <div>
                
                <select className= {selectClassName}
                value = {min}
                onChange={(e)=>onPriceRangeChange(e.target.value,'MinVal')}
                >
                <option value={0} key='priceMin'>No Min</option>
                {minPriceOptions.map((price) => (
                <option value={price} key={'priceMin'+price}>{"$"+new Intl.NumberFormat().format(+price)}</option>)
                )}
                </select>
                    
                </div>
            </div>
            <div>Max:
                <div>
                 
                <select className= {selectClassName}
                value = {max}
                onChange={(e)=>onPriceRangeChange(e.target.value,'MaxVal')}
                >
                {maxPriceOptions.map((price) => 
                    (<option value={price} key={'priceMax'+price}>{"$"+new Intl.NumberFormat().format(+price)}</option>)
                )}
                <option value={0} key='priceMax'>No Max</option>
                </select>
                   
                </div>
            </div>
        </div>  
    )
};

export default PriceFilterOptions;
