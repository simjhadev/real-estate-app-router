import Image from 'next/image';

interface AllPicsGridProps{
    photos: Array<string>;
}

export default function AllPicsGrid({photos}: AllPicsGridProps){
    const defaultImage = "https://ap.rdcpix.com/9e6c24a10028e42651d866306062a3e8l-m3734405187x.jpg";
    return(
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[1vw] w-[61vw] lg:w-[62vw] m-auto">
            {photos ? photos.map((photo,i)=>(
                <div className="relative overflow-hidden w-[30vw] h-[30vw] lg:w-[20vw] lg:h-[20vw]" key={'p'+i}>
                <Image src={photo ? photo : defaultImage} 
                fill={true} 
                style={{objectFit: "cover"}} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw" 
                loading="lazy" 
                alt="Property Pics"
                placeholder='blur' 
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8/h8AArMB2L6P/lIAAAAASUVORK5CYII='/>
                </div>
                )): null}
        </div>
    
           
    )
}