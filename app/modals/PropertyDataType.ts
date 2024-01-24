export interface PropertyDataType{
    property_id : string;
    coverPhoto: string | null;
    coverPhotoLowRes: string | null;
    prop_type: string;
    price: string | null;
    beds: number | null;
    baths: number | null;
    sqft: number | null;
    address: string;
    estimate: string | null;
}

export interface PropertyDetailsType{
    price: string | null;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    estimate: string | null;
    prop_type: string;
    year_built: number;
    heating: string | null;
    cooling: string | null;
    parking: number | null;
    hoa: number;
    descriptionText: string;
    prop_details : Array<propFeaturesT>;
    agents: Array<AgentType> | null;
    photos: Array<string>
}

interface AgentType{
    agentName : string;
    agentEmail : string;
}

interface propFeaturesT{
    category : string;
    text : Array<string>;
}

