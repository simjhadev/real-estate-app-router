import PropertySearchFilterBar from "../components/PropertySearchFilterBar/PropertySearchFilterBar";

import { AppWrapper } from "../AppContext/AppContext";

export default function SearchLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <AppWrapper>
            <PropertySearchFilterBar />
            <div className="pt-20 font-semibold text-xl text-blue-500">
                Home For You
                </div>
                <div className="pb-2 text-gray-400">
                Based on your Search 
                </div>
                <hr className="border-2" />
                <div className="w-full pt-10">
                {children}
                   
                </div>
        </AppWrapper>
    )
  }