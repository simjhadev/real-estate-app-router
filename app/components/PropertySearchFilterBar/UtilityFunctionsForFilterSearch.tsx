import { ListingStatus, searchQueryParams } from "@/app/modals/PropertyFilter";

export const setListingStatusState = (propertyStatus: string) => {
    
    switch(propertyStatus){
        case 'for_sale':
            return {statusVal: 'for_sale', displayTxt: 'Sale'};
        case 'for_rent':
            return {statusVal: 'for_rent', displayTxt: 'Rent'};
        default :
            return {statusVal: '', displayTxt: 'Listing Status'};
    }
}

export const setBedBathState = (minVal:string, maxVal:string, displayTxt:string) => {
    let tempTxt;
    if(minVal !== "0" && maxVal !== "0"){
        tempTxt = `${minVal} - ${maxVal} ${displayTxt}`;
    }
    else {
        if(minVal === "0" && maxVal === "0"){
            tempTxt = displayTxt;
        }
        else if(minVal === "0"){
            tempTxt = `Any - ${maxVal} ${displayTxt}`;
        }
        else if(maxVal === "0"){
            tempTxt = `${minVal}+ ${displayTxt}`
        }
    }

    return {
        min: (minVal ? minVal : '0'),
        max: (maxVal ? maxVal : '0'),
        displayTxt : tempTxt,
    };
}

export const setPriceState = (pmin:null|string, pmax:null|string) => {
    return {
        min: (pmin ? pmin : "0"),
        max: (pmax ? pmax : "0"),
        displayTxt: setDisplayTxtForPrice(pmin, pmax)
    };
}

export const setDisplayTxtForPrice = (pmin:null|string, pmax:null|string|number) => {
    let tempTxt, minValue, maxValue;
    tempTxt = "";
    minValue = (pmin === "0" || pmin === null || pmin === "") ? parseFloat('0') : parseFloat(pmin+"");
    maxValue = (pmax === "0" || pmax === null || pmax === "") ? parseFloat('0') : parseFloat(pmax+"");
    //console.log(pmin,pmax);
    //console.log(minValue,maxValue);

    if(minValue !== 0 && maxValue !== 0){
        tempTxt = `\$${new Intl.NumberFormat().format(minValue)} - \$${new Intl.NumberFormat().format(maxValue)}`;
    }else{
       if(minValue === parseFloat('0') && maxValue === parseFloat('0')){
            tempTxt = 'Price';
        }
        else if(minValue === parseFloat('0')){
            tempTxt = `Up To \$${new Intl.NumberFormat().format(maxValue)}`;
        }
        else if(maxValue === parseFloat('0')){
            tempTxt = `\$${new Intl.NumberFormat().format(minValue)}+`
        }
    }
    return tempTxt;
}
/* 
export const createQueryParams = 
    (listingStatus: string, offset:string, location:string, bdmin:string, bdmax:string, pmin:string, pmax:string) => {
    const query : searchQueryParams = {
        status : listingStatus, 
        location  : location, 
        locRadius : "1",
        offset : offset,
    };


    if(bdmin !== '0' && bdmin !== null){
        query.bdmin = bdmin;
    }
    if(bdmax !== '0' && bdmax !== null){
        query.bdmax = bdmax;
    }
    
    if(parseFloat(pmin) !== 0 && pmin !== null){
        query.pmin = pmin;
    }
    if(parseFloat(pmax) !== 0 && pmax !== null){
        query.pmax = pmax;
    }
    console.log(query);

    return query;

}; */