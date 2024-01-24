"use client";



import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

 import FilterOptions from './FilterOptions';
 import { ListingStatus, bedRange, PriceRange } from "@/app/modals/PropertyFilter";

 interface FilterLayoutForMobTabProps{
    onListingStatusChange: (listingStatusVal:string) => void;
    listingStatus: ListingStatus;
    onBedRangeChange: (selectedVal:string, selectedType:string) => void;
    bedCountRange: bedRange;
    onPriceRangeChange:(selectedVal:string, selectedType: string)=> void;
    priceRange: PriceRange;
    onSearch:(e: React.MouseEvent<HTMLButtonElement>)=>void;
 }

const FilterLayoutForMobTab = ({onListingStatusChange,listingStatus,onBedRangeChange,bedCountRange,
  onPriceRangeChange,priceRange,onSearch}: FilterLayoutForMobTabProps) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    

    /* const searchHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose();
      onSearch(event);
    } */

    return (
        <>
        <button className="bg-blue-200 hover:bg-blue-300 p-2 text-sm font-semibold rounded-lg pl-4 pr-4" 
        onClick={onOpen}>Filters</button>

        <Modal isOpen={isOpen} 
        size="sm"
        onOpenChange={onOpenChange} 
        placement="top"
        scrollBehavior="inside"
        >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        Filters
                    </ModalHeader>
                    <ModalBody>
                    <FilterOptions 
                        onListingStatusChange={onListingStatusChange}
                        listingStatus={listingStatus}
                        onBedRangeChange={onBedRangeChange}
                        bedCountRange={bedCountRange}
                        onPriceRangeChange={onPriceRangeChange}
                        priceRange={priceRange}
                        onSearch={(event)=>{onClose(); onSearch(event);}}
                        />
                        
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button className="bg-blue-200 hover:bg-blue-300" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter> */}
                    </>
                    
                )}
                </ModalContent>
            </Modal>

        </>
        
    );
}

export default FilterLayoutForMobTab;