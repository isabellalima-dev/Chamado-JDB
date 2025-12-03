import Image from "next/image";
import Logo from '@/assets/images/logo.svg';

export function Header(){
    return(
        <div className="bg-[#144517] flex items-center justify-center lg:justify-start">
            <Image src={Logo} alt="logo" className="pt-3 pb-5"/>
        </div>
    )
}