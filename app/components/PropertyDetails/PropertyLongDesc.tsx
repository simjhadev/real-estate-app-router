"use client"

import React, { useState, useEffect } from "react"
import { PropertyDetailsType } from "@/app/modals/PropertyDataType"
import { BiBuildingHouse, BiCalendar } from 'react-icons/bi';
import { BsThermometerHalf, BsSnow } from 'react-icons/bs';
import { RiParkingBoxLine } from 'react-icons/ri';
import { FaHands } from 'react-icons/fa';

interface PropertyLongDescProps{
    propertyDtls : PropertyDetailsType;
}

interface PropDescDtlsFlag{
    flag : boolean;
    desc : string;
}


export default function PropertyLongDesc({propertyDtls} : PropertyLongDescProps){
    const { prop_type, year_built, heating, cooling, parking, hoa, descriptionText, prop_details, agents} = {... propertyDtls};
    const [ propDescFlag, setPropDescFlag ] = useState<PropDescDtlsFlag>({flag: false, desc: ""});
    const [ propDtlsFlag, setPropDtlsFlag ] = useState<PropDescDtlsFlag>({flag: false, desc: ""});
    
    useEffect(()=>{
        //console.log('Inside useEffect', descriptionText, prop_details);
        
        if(propDescFlag.desc === "" && descriptionText?.length > 300){
            setPropDescFlag({
                ...propDescFlag,
                flag: false,
                desc: "READ MORE"
            });
        }

        if(propDtlsFlag.desc === "" && prop_details?.length > 1){
            setPropDtlsFlag({
                ...propDtlsFlag,
                flag: false,
                desc: "SEE MORE"
            });
        }
    },[descriptionText,prop_details]);

    

    const openCloseClickHandler = (flagVar : PropDescDtlsFlag, setflagVar : React.Dispatch<React.SetStateAction<PropDescDtlsFlag>>, openTxt : string, closeTxt : string) => {
        
        if(flagVar.desc === openTxt){
            setflagVar({
                ...flagVar,
                flag: true,
                desc: closeTxt
            });
        }
        else if(flagVar.desc === closeTxt){
            setflagVar({
                ...flagVar,
                flag: false,
                desc: openTxt
            });
        }
    }

    return(
        
        <div className="flex flex-col w-full gap-1 pl-5">
            <h1 className="text-2xl md:text-3xl">Overview</h1><br/>
            <div className="grid grid-cols-[35px_minmax(0,_1fr)] gap-y-2 justify-items-start">
                {prop_type?
                    <>
                    <span><BiBuildingHouse size='25px' color='#2B6CB0'/></span>
                    <span className="text-lg">{prop_type}</span>
                    </>
                    :
                    null
                }
                {year_built?
                    <>
                    <div><BiCalendar size='25px' color='#2B6CB0'/></div>
                    <div><p className="text-lg">Built in {year_built}</p></div>
                    </>
                    :
                    null
                }
                {heating?
                    <>
                    <div><BsThermometerHalf size='25px' color='#2B6CB0'/></div>
                    <div><p className="text-lg">Heating: {heating}</p></div>
                    </>
                    :
                    null
                }
                {cooling?
                    <>
                    <div><BsSnow size='25px' color='#2B6CB0'/></div>
                    <div><p className="text-lg">Cooling: {cooling}</p></div>
                    </>
                    :
                    null
                }
                {parking?
                    <>
                    <div><RiParkingBoxLine size='25px' color='#2B6CB0'/></div>
                    <div><p className="text-lg">Parking: {parking}</p></div>
                    </>
                    :
                    null
                }
                {hoa?
                    <>
                    <div><FaHands size='25px' color='#2B6CB0'/></div>
                    <div><p className="text-lg">HOA: {hoa}</p></div>
                    </>
                    :
                    null
                }
                
            </div>
             
            <br />
            <hr />
            {descriptionText ?
                <>
                <div className="pl-0 pt-5">
                    <p>
                    {propDescFlag.desc === 'READ MORE' ? 
                        <>{descriptionText.substring(0, 400) + '...'}</>
                    : descriptionText}
                    </p>
                
                {propDescFlag.desc != "" ?
                        <p className="text-sm font-bold text-blue-400 cursor-pointer" onClick={() => openCloseClickHandler(propDescFlag, setPropDescFlag ,'READ MORE','READ LESS')}>
                            {propDescFlag.desc}
                        </p>
                    :null}
                </div>
                </>
            :null}
            
            <p className="text-2xl font-bold pb-4 pt-6">Features </p>
            
            {prop_details ?
                <>
                {propDtlsFlag.desc === 'SEE MORE' ?
                    <>
                    <p className="font-bold">{prop_details[0].category}</p>
                    <div>{prop_details[0].text ? 
                            prop_details[0].text.map((propDtlText,j)=>(
                                <p className="text-sm pl-5" key={'pdtlTxt0'+j}>{propDtlText}</p>
                            ))
                            :null}
                    </div>
                    <br />
                    </>
                :
                prop_details.map((prop_detail,i)=>(
                    <React.Fragment key={'pdtl'+i}>
                        <p className="font-bold">{prop_detail.category}</p>
                        <div>{prop_detail.text ? 
                                prop_detail.text.map((propDtlText,j)=>(
                                    <p className="text-sm pl-5" key={'pdtlTxt'+i+j}>{propDtlText}</p>
                                ))
                                :null}
                        </div>
                        <br />
                    </React.Fragment>
                    ))
                }

                {propDtlsFlag.desc != "" ?
                        <p className="text-sm font-bold text-blue-400 cursor-pointer" onClick={() => openCloseClickHandler(propDtlsFlag, setPropDtlsFlag,'SEE MORE','SEE LESS')}>
                            {propDtlsFlag.desc}
                        </p>
                    :null}
                </>

            :null}
            
            <hr />
            {agents ? <p className="font-bold">Listed By:</p> : null}
            {agents ? 
                agents.map((agent,i)=>(
                <React.Fragment key={'a'+ i}>
                    {agent.agentName ? <p>Agent_name : {agent.agentName}</p> : null}
                    {agent.agentEmail ? <p>Agent_email : {agent.agentEmail}</p> : null}
                    <br />
                </React.Fragment>
                
            ))
            :
            null}
            
        </div>
    )
}