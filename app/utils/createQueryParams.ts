type createQueryParamsType ={
    status: string;
    location: string;
    locRadius: string;
    offset: string;
    bdmin: string;
    bdmax: string;
    pmin: string;
    pmax: string;
};

export const createQueryParams = ({status, location, locRadius, offset, bdmin, bdmax, pmin, pmax}: createQueryParamsType) => {
    const params = new URLSearchParams();
    params.set("status",status);
    params.set("location",location);
    params.set("locRadius",locRadius);
    params.set("offset",offset);


    if(bdmin !== '0'){
        params.set("bdmin", bdmin);
    }
    if(bdmax !== '0'){
        params.set("bdmax", bdmax);
    }
    if(parseInt(pmin) !== 0){
        params.set("pmin", pmin+"");
    }

    if(parseInt(pmax) !== 0){
        params.set("pmax", pmax+"");
    }
    console.log(params);
    //console.log(query.toString());

    return params.toString();

};