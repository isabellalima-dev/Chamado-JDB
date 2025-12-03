
import Image from "next/image";
import Sucesso from "@/assets/icons/sucess.png"
import Email from '@/assets/icons/e-mail.svg'
import WhatsApp from "@/assets/icons/Whatsapp.svg"
import Tonny from "@/assets/images/tonny.svg"


export function Sucess({ onReset }: { onReset?: () => void }) {
  return (
  <div className=" flex flex-col h-auto items-center justify-center gap-10">
    <div className="w-[90%] lg:w-[63%] p-6 bg-white  rounded-2xl shadow space-y-6 flex flex-col justify-center items-center">
    <div className="gap-5 flex flex-col items-center">
     <Image src={Sucesso} alt="Chamado enviado"/>
     <p className="text-[#00A63E] text-[20px]">Solicitação enviada com sucesso!</p>
     <p className="text-center text-[16px] text-[#4A5565] lg:w-[65%]">Agradecemos pelo envio da sua solicitação. Nossa equipe entrará em contato em breve através dos dados fornecidos. O Jogo dos Bichos agradece pela preferência e confiança!</p>
     </div>

     <div className="bg-[#70C752]/20 w-[90%] flex flex-col items-center justify-center gap-4 p-2 rounded-[10px] border border-solid border-[#70C752]">
        <p className="text-[#364153] text-[16px]">Você receberá um retorno por:</p>
        <div className=" flex-row gap-2 flex text-[#364153]">
            <Image src={Email} alt="Resposta por e-mail ou"/>
            <p>E-mail</p>
        </div>
          <div className="flex-row gap-2 flex text-[#364153]">
            <Image src={WhatsApp} alt="por WhatsApp"/>
            <p>WhatsApp</p>
        </div>
     </div>

    <div className=" flex flex-row gap-1">
      <p className="text-[#6A7282] text-[14px]">Tempo médio de resposta:</p>
      <p className="text-[#364153] text-[14px]">24 horas úteis</p>
    </div>

        <button
            type="button"
            className="bg-[#427E00] rounded-[10px] text-white p-3 cursor-pointer  hover:bg-green-900"
          >
            Enviar nova solicitação
        </button>
    </div>

    <Image src={Tonny} alt="Até logo!"/>
  </div>
  );
}
