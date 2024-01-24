import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

interface ButtonProps{
    onClick : React.MouseEventHandler;
    disabled : boolean;
}

const buttonStyle = "absolute top-[30vh] rounded-full bg-blue-400  hover:bg-blue-600 disabled:bg-slate-300"
const iconStyle = "text-3xl text-white"

export const PrevButton = ({onClick, disabled} : ButtonProps) =>  {
    return(
        <button className={`${buttonStyle} left-0`} disabled={disabled} aria-label='Picture previous button' onClick={onClick} >
        <TfiArrowCircleLeft className={iconStyle}/>  
        </button>
    )
    

}

export const NextButton = ({onClick, disabled} : ButtonProps) => {
    return(
        <button className={`${buttonStyle} right-0`} disabled={disabled} aria-label='Picture next button' onClick={onClick}>
        <TfiArrowCircleRight className={iconStyle} />
        </button> 
    )
    
}