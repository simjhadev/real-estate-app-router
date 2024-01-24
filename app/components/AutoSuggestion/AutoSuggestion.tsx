"use client";

import { useState } from 'react';

import AutoSuggestionInput from "./AutoSuggestionInput";
import AutoSuggestionList from "./AutoSuggestionList";

interface AutoSuggestionProps{
    address: string;
    onAddressInputChange:(address: string)=>void;
    addressList:Array<string>;
}

const AutoSuggestion = ({address, onAddressInputChange, addressList}:AutoSuggestionProps) => {
    const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false);
    
    const onAddressInputChangeHandler = (address:string) => {
        onAddressInputChange(address);
        setIsAutoSuggestOpen(true);
    }

    return(
        <>
            <AutoSuggestionInput address={address} onAddressInputChange={onAddressInputChangeHandler} />
            <AutoSuggestionList addressList={addressList} isOpen={isAutoSuggestOpen} setIsAutoSuggestOpen={setIsAutoSuggestOpen} setAddress={onAddressInputChange}/>
        </>
    );
}

export default AutoSuggestion;