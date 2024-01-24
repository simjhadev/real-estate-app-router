"use client"

import { PropertyDetailsType } from '@/app/modals/PropertyDataType';
import PropertyImages from './PropertyImages';
import PropertyShortDesc from './PropertyShortDesc';
import PropertyLongDesc from './PropertyLongDesc'

interface PropertyDetailsProps{
    propertyDtls: PropertyDetailsType;
    propertySearchOption: string;
}

export default function PropertyDetails({propertyDtls, propertySearchOption} : PropertyDetailsProps){
    const containerClass = "grid grid-cols-1"
    const imageContainerClass ="h-[60vh] overflow-hidden"
    //console.log(propertyDtls);

    return(
        <div className={containerClass}>
        
            <div className={imageContainerClass}>
                <PropertyImages propertyDtls={propertyDtls} />
            </div>
            
            <div>
                <PropertyShortDesc propertyDtls={propertyDtls} propertySearchOption={propertySearchOption}/>
            </div>

            <div>
                <PropertyLongDesc propertyDtls={propertyDtls}/>
            </div>
        
      </div>
    )
} 