"use client";

interface AutoSuggestionInputProps{
    address: string;
    onAddressInputChange: (address:string) => void;
}

const AutoSuggestionInput = ({address, onAddressInputChange}: AutoSuggestionInputProps) => {
    return(
        <input className="p-2 border-1 border-slate-200 w-full placeholder:text-slate-400"
        placeholder="Address, City, Zip" value={address} autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAddressInputChange(e.target.value)} />
    );
}

export default AutoSuggestionInput;