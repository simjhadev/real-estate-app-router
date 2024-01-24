"use client"
import { SyntheticEvent, useEffect, useRef } from 'react';
//import { List, ListItem } from '@chakra-ui/react';

interface AutoSuggestionListProps{
    addressList: Array<string>;
    setAddress:(address:string)=>void;
    isOpen:boolean;
    setIsAutoSuggestOpen:(isAutoSuggestionOpen: boolean)=> void;
}


const AutoSuggestionList = ({addressList, setAddress, isOpen, setIsAutoSuggestOpen}:AutoSuggestionListProps) => {
    
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e : MouseEvent) => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          //console.log("In useEffect", isOpen, e.target instanceof HTMLElement,"dhfchsdfh");
          
          if (isOpen && e.target instanceof HTMLElement && !ref?.current?.contains(e.target)) {
            console.log("clicked outside");
            setIsAutoSuggestOpen(false);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [isOpen]);

      const listItemClickHandler = (address: string) => {
        setAddress(address);
        setIsAutoSuggestOpen(false);
    }

    return(
        <>
        {(addressList?.length > 0 && isOpen) ? 
        <ul className="absolute w-full z-10 bg-white p-5 max-h-[300px] overflow-y-scroll border-1 rounded-lg border-gray-200 mt-2" ref={ref}>
            {addressList.map((address,i)=>(
                <li className="bg-white cursor-pointer hover:bg-gray-100" key={"add"+i} 
                    onClick={()=>{listItemClickHandler(address)}}>
                    {address}
                </li>
            ))}
        </ul>
        : null}
        </>
    );

}

export default AutoSuggestionList;