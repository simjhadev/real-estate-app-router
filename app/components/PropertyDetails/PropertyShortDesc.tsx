import { PropertyDetailsType } from "@/app/modals/PropertyDataType"

interface PropertyShortDescProps{
    propertyDtls: PropertyDetailsType;
    propertySearchOption: string;
}

export default function PropertyShortDesc({propertyDtls, propertySearchOption}: PropertyShortDescProps){
    const{ price, beds, baths, sqft, address, estimate } = {... propertyDtls};

    return(
        <div className="flex flex-col w-full gap-4 pl-5 pb-5 md:pt-5">
            {price ?
                <p className="text-2xl md:text-3xl font-bold">{price}</p>
            :null}
            
            <p className="text-lg">{beds ? <>{beds} bd | </>:null}
                                {baths ? <>{baths} ba | </>:null}
                                {sqft ? <>{sqft} sqft</>:null}</p>
            {address ?
                <p>{address}</p>
            :null}

            {(propertySearchOption==='sale' && estimate) ?
                <p className="text-lg text-blue-600"><b>Estimate :</b> {estimate}</p>
            :null}
            
        </div>
    )
}