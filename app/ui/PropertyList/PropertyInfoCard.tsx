"use client"

import Image from 'next/image'
import { PropertyDataType } from '../../modals/PropertyDataType'
import { FaBed, FaBath } from 'react-icons/fa'
import DefaultImage from '../../../public/DummyHouse.png'
import { useRouter } from 'next/navigation'

interface PropertyInfoCardProps{
    propertyDtls : PropertyDataType;
}

export default function PropertyInfoCard({propertyDtls}: PropertyInfoCardProps){
    const router = useRouter();
    const { property_id, coverPhoto, price, prop_type, beds, baths, sqft, address } = {... propertyDtls};

    const handleClick = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        router.push("/"+property_id)
    }

    return(
        <div className=" flex flex-wrap w-[80vw] md:w-[45vw] xl:w-[30vw] pt-0 justify-start cursor-pointer border-1 rounded-lg border-slate-100 m-0 md-3 shadow-md" onClick={handleClick} >
            
            <div className="relative overflow-hidden w-[80vw] md:w-[45vw] xl:w-[30vw] h-[50vw] md:h-[30vw] xl:h-[20vw] rounded-t-lg">

            <Image src={coverPhoto ? coverPhoto : DefaultImage} 
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
            style={{objectFit: "cover"}} 
            loading="lazy" alt="Property Pics"
            placeholder='blur' 
            
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8/h8AArMB2L6P/lIAAAAASUVORK5CYII='
            />
            </div>

            <div className="w-full p-4">
                {price ?
                    <div className="text-lg font-bold">{price}</div>
                :null}
                
                {prop_type ?
                    <div>{prop_type}</div>
                :null}
                
                    
                <div className="flex align-middle p-1  w-['300px'] text-blue-400">
                {beds ? <> {beds}&nbsp;<FaBed /> {" "}&nbsp;|</>: null}  
                
                {baths ? <>{baths}&nbsp;<FaBath />&nbsp;|</>: null}
                
                {sqft ? <>{sqft} sqft</>: null}
                
                </div>
        
                <div className="text-md">
                {address.length > 30 ? address.substring(0, 40) + '...' : address}
                </div>
            </div>
        </div>
    )
}