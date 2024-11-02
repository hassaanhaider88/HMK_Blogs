import Image from "next/image";

// app/loading.js
export default function Loading() {
    return (
      <div className="loading w-full h-[80vh] flex items-center justify-center">
       <Image className='w-full h-full' alt={'logo'} unoptimized src={"https://i.pinimg.com/originals/a7/b0/15/a7b015d343ad801ad6da8c242dc6ae06.gif"} width={100} height={100} alt={"loading"} />
      </div>
    );
  }
  