"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { PropertyDetailsType } from '@/app/modals/PropertyDataType';
import { PrevButton, NextButton } from '@/app/ui/PrevNextButton/PrevNextButton';
import dummyImage from '../../../public/estate-icon.png';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import AllPicsGrid from '@/app/ui/AllPicsGrid/AllPicsGrid';


interface PropertyImageProps{
    propertyDtls: PropertyDetailsType;
}

export default function PropertyImages({propertyDtls} : PropertyImageProps){
    const [isMobile, setIsMobile] = useState<boolean|undefined>();
     // window.matchMedia("(max-width: 768px)").matches
    const [disablePrevBtn, setDisablePrevBtn] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(true);
    const [picsCount, setPicsCount] = useState(1);
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const [picSlidePos, setPicSlidePos] = useState(0);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

    const { photos } = {... propertyDtls};
    const first5Pics = photos?.slice(0,5);
    const defaultImage = "https://ap.rdcpix.com/9e6c24a10028e42651d866306062a3e8l-m3734405187x.jpg";

    const imageCell = "relative overflow-hidden"
    const fullSizeImage = "w-[49vw] h-[60vh]"
    const halfSizeImage = "w-[49vw] h-[29vh]"
    const quaterSizeImage = "w-[24vw] h-[30vh]"
    const pic1 = {
        cell0 : imageCell + " " + fullSizeImage + " " + "col-start-2 col-end-4 row-start-1 row-end-3",
    }
    const pic2 = {
        cell0 : imageCell + " " + fullSizeImage + " " + " col-start-1 col-end-3 row-start-1 row-end-3",
        cell1 : imageCell + " " + fullSizeImage,
    }
    const pic3 = {
        cell0 : imageCell + " " + fullSizeImage + " " + " col-start-1 col-end-3 row-start-1 row-end-3",
        cell1 : imageCell + " " + halfSizeImage, 
        cell2 : imageCell + " " + halfSizeImage + " " + " col-start-3 col-end-5 row-start-2 row-end-3",
    }
    const pic4 = {
        cell0 : imageCell + " " + fullSizeImage + " " + " col-start-1 col-end-3 row-start-1 row-end-3",
        cell1 : imageCell + " " + quaterSizeImage, 
        cell2 : imageCell + " " + quaterSizeImage,
        cell3 : imageCell + " " + halfSizeImage,
    }
    const pic5 = {
        cell0 : imageCell + " " + fullSizeImage + " " + " col-start-1 col-end-3 row-start-1 row-end-3",
        cell1 : imageCell + " " + quaterSizeImage, 
        cell2 : imageCell + " " + quaterSizeImage,
        cell3 : imageCell + " " + quaterSizeImage,
        cell4 : imageCell + " " + quaterSizeImage,
    }
    

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setIsMobile( e.matches ));
      }, []);

    useEffect(()=>{
        //console.log(picsCount);
        if(photos?.length > 0 )
        {
            setPicsCount(photos.length);
        }
    },[propertyDtls]);

    useEffect(()=>{
        
        if(picsCount > 1){
            setDisablePrevBtn((currentPicIndex <= 0) ? true : false);
            setDisableNextBtn((currentPicIndex < (picsCount - 1)) ? false : true);
            setPicSlidePos(-(currentPicIndex * 100));
        }   

    },[currentPicIndex, picsCount]);

    const prevClickHandler = () => {
        if(!disablePrevBtn){
            setCurrentPicIndex((index) => index - 1);
        }
    };

    const nextClickHandler = () => {
        if(!disableNextBtn){
            setCurrentPicIndex((index) => index + 1);
        }
    };

    

    return(
        <>
        {/* {currentPicIndex+"      "+picSlidePos} */}
        {isMobile ? 
            <>
            <div className="relative overflow-hidden ">
            <div className='relative flex w-full' style={{marginLeft: picSlidePos+"vw", transition: 'all 1s ease-out',}}>
            {photos ? photos.map((photo,i)=>(
                <div key={'mobSizePPic'+i} >
                <div className="relative w-[100vw] h-[60vh]">
                    <Image src={photo ? photo : defaultImage}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
                    style={{objectFit: "cover"}} 
                    loading="lazy" alt="Property Pics"
                    placeholder='blur' 
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8/h8AArMB2L6P/lIAAAAASUVORK5CYII='
                    />
                </div>
                </div>
            )): null}
                

            </div>
            <PrevButton onClick={prevClickHandler} disabled={disablePrevBtn}/>
            <NextButton onClick={nextClickHandler} disabled={disableNextBtn}/>
            </div>

            
            </>
        : 
            <>
            <div className="relative grid grid-cols-4 grid-rows-2 gap-[1vw] overflow-scroll">
                {first5Pics ? first5Pics.map((photo,i)=>(
                <div className={eval('pic'+first5Pics.length+'.'+'cell'+i)} key={'p'+i}>
                <Image src={photo ? photo : defaultImage} 
                fill={true} 
                style={{objectFit: "cover"}} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw" 
                loading="lazy" 
                alt="Property Pics"
                placeholder='blur' 
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8/h8AArMB2L6P/lIAAAAASUVORK5CYII='
                />
                </div>
                )): null}
                <button className='absolute bottom-5 right-5 bg-white border-2 border-blue-500 text-blue-500 p-2 cursor-pointer rounded-md text-sm font-bold'
                    onClick={onOpen}
                >
                    See all {picsCount} photos
                </button>
            </div>
            
            <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">
                        Property Photos
                    </ModalHeader>
                    <ModalBody>
                        <AllPicsGrid photos={photos}/>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button className="bg-blue-400" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>

            </>
        
        }
        
           
             
        

        </>

    )
}