import PropertyCard from './PropertyCard';

export default function PropertyListLoading({count}: {count:number}){
    const placeholderList = [];
    for(let i = 1; i <= count; i++){
        placeholderList.push(<PropertyCard key={"PHList"+i} />);
    }
    return(
        <div className="w-full">
            <div className="w-[80vw] md:w-[91vw] xl:w-[92vw] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1vw] justify-items-center m-auto">
                {placeholderList}
            </div>
        </div>
    )
}