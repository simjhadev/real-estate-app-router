import PropertyListLoading from "./ui/LoadingComponents/PropertyListLoading";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
        <div className="relative h-[60vh] w-full bg-slate-100">
        </div>
    
        <div className="pt-20 font-semibold text-xl text-blue-500">
          Home For You
        </div>
        <div className="pb-2 text-gray-400">
          Based on your Search 
        </div>
        <hr className="border-2" />
    
        <div className="w-full pt-10">
          <PropertyListLoading count={6} />
        </div>
      </>
    )
  }