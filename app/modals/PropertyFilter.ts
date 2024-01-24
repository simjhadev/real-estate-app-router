export interface ListingStatus{
    statusVal: string;
    displayTxt: string;
}

export interface searchQueryParams{
    status : string; 
    location  : string; 
    locRadius : string;
    offset : string;
    bdmin?: string;
    bdmax?: string;
    pmin?: string;
    pmax?: string;
}

export interface bedRange{
    min: string;
    max: string;
    displayTxt : string|undefined;
}

export interface PriceRange{
    min: string|number;
    max: string|number;
    displayTxt : string|undefined;
}