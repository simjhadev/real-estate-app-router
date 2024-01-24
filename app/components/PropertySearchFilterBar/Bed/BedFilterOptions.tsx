//import { HStack, Box, Select } from '@chakra-ui/react';
import { bedRange } from '@/app/modals/PropertyFilter';

interface BedFilterOptionsProps{
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange : bedRange;
}

const BedFilterOptions = ({onBedRangeChange, bedCountRange}: BedFilterOptionsProps) => {
    
    const bedCntFromOptions = ['1','2','3','4','5'];
    const bedCntToOptions = ['1','2','3','4','5'];
    const {min, max} = bedCountRange;
    const selectClassName = "p-2 pl-5 pr-5 text-sm border-1 rounded-md border-slate-300 focus:border-blue-300"
    
    return(
        <div className="flex gap-2">
            <div >From:
                <div>
                <select className= {selectClassName}
                value = {min}
                onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>onBedRangeChange(e.target.value,'RangeStart')}
                >
                <option value="0">No Min</option>
                {bedCntFromOptions.map(cnt => (
                <option value={cnt} key={'bedCntFOpt'+cnt}>{cnt}</option>)
                )}
                </select>
                </div>
                
            </div>
            <div >To:
                <div>
                <select className= {selectClassName} 
                value = {max}
                onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>onBedRangeChange(e.target.value,'RangeTo')}
                >
                <option value="0">No Max</option>
                {bedCntToOptions.map(cnt => 
                    (<option value={cnt} key={'bedCntTOpt'+cnt}>{cnt}</option>)
                )}
                </select>
                </div>
                
            </div>
        </div>

        
    )
};

export default BedFilterOptions;
