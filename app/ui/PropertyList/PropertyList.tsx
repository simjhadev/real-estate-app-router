import { PropertyDataType } from '../../modals/PropertyDataType'
import PropertyInfoCard from './PropertyInfoCard'

interface PropertyListProps{
    propertyListInfo : Array<PropertyDataType>;
}

export default function PropertyList({propertyListInfo}: PropertyListProps){
    return(
            <div className="w-[80vw] md:w-[91vw] xl:w-[92vw] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1vw] justify-items-center m-auto">
                
                {propertyListInfo ?
                <>
                    {propertyListInfo.map((pDtl:PropertyDataType)=>(
                    <PropertyInfoCard propertyDtls={pDtl} key={pDtl.property_id}/>
                    ))}
                </>
                :<div>Placeholder</div>
                }
            </div>
    )
}