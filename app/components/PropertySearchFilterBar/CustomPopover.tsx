import { ReactElement, useState } from 'react';

import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { BsChevronCompactDown, BsChevronCompactUp} from 'react-icons/bs';

interface CustomPopoverProps{
    filterName: string;
    popoverHeader: string;
    children: ReactElement;
}

const CustomPopover = ({filterName, popoverHeader,children}: CustomPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="flex flex-col gap-2">
            <Popover placement="bottom-start" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                <Button className='bg-slate-200 rounded-md font-semibold'>
                    <>{filterName}{isOpen ? <BsChevronCompactUp/> : <BsChevronCompactDown/>}</></Button>
                </PopoverTrigger>
                <PopoverContent>
                <div className="p-4">
                    <h3 className="text-medium font-bold pb-2">
                        {popoverHeader}
                    </h3>
                    
                    {children}
                </div>
                    
                </PopoverContent>
            </Popover>
        </div>
    )
};

export default CustomPopover;
