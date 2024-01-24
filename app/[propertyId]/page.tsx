import { fetchPropertyDetails } from "../utils/fetchPropertyDetails";
import { PropertyDetailsType } from "../modals/PropertyDataType";
import { pDetails } from "../modals/PropertyDetailsValue";
import PropertyDetails from "../components/PropertyDetails/PropertyDetails";

export default async function PropertyDetailsPg({ params }: { params: { propertyId: string } }) {
//export default async function PropertyDetailsPg() {
    const {responseCode, data} : {responseCode : number, data: null|PropertyDetailsType}  = await fetchPropertyDetails(params.propertyId);
    if( responseCode !== 200)
      throw new Error("Unable to fetch data");

    //console.log(JSON.stringify(resPropertyDetails, null, "\t"))
    //const resPropertyDetails : PropertyDetailsType = pDetails;
    return(
        <>
        {data && <PropertyDetails propertyDtls={data}  propertySearchOption="sales"/>};
        </>   
    )
}