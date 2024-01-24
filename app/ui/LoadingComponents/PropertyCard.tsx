const PropertyCard = () => {
    return(
        <div className=" flex flex-wrap w-[80vw] md:w-[45vw] xl:w-[30vw] pt-0 justify-start cursor-pointer border-1 rounded-lg border-slate-100 m-0 md-3 shadow-md">            
            <div className="overflow-hidden w-[80vw] md:w-[45vw] xl:w-[30vw] h-[50vw] md:h-[30vw] xl:h-[20vw] rounded-t-lg bg-slate-200 mb-3">

            </div>
            <hr className="h-5 w-[60%] bg-slate-200 mb-3"/>
            <hr className="h-5 w-[100%] bg-slate-200 mb-2"/>
            <hr className="h-5 w-[100%] bg-slate-200 mb-2"/>
        </div>
    )
}

export default PropertyCard;