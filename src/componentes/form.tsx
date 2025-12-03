"use client";
import { useFormViewModel } from "@/viewmodels/UseViewModels";
import { Step1 } from "@/componentes/steps/step";
import { Step2 } from "@/componentes/steps/step_dois";

export function Form({ onSuccess }: { onSuccess: () => void }) {
  const { step, formData, updateField, nextStep, prevStep, handleSubmit, loading } =
    useFormViewModel(onSuccess);

  const subassuntosMap: Record<string, string[]> = {
    "Esqueci a minha senha": ["Já tentei resetar a minha senha e não deu certo", "Não tenho mais acesso no e-mail"],
    "Solicitei um saque e não recebi": ["Já aguardei o prazo de 2 dias úteis e não recebi o meu saque"],
    "O resultado do meu jogo não está no aplicativo": [],
    "Fiz uma compra de crédito e o valor não está disponível": [],
    "Quero falar sobre um jogo que eu fiz": ["O resultado do meu jogo já está disponível e estou com dúvida"],
    "Indiquei e não recebi meu bônus": [],
    "Não consigo concluir meu cadastro": [],
    "O valor do meu prêmio veio errado": [],
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10 w-full">
      <form className="w-[90%] lg:w-[40%] p-6 bg-white rounded-2xl shadow space-y-6">
        <h2 className="text-xl font-bold text-[#00A10A] text-center">Contate o Suporte</h2>

        {step === 1 && (
          <Step1
            formData={formData}
            updateField={updateField} 
            nextStep={nextStep}
            subassuntosMap={subassuntosMap}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            updateField={updateField}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </form>
    </div>
  );
}
