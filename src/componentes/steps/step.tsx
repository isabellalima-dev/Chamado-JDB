"use client";
import React from "react";
import { FormDataModel } from "@/models/types";

interface Step1Props {
  formData: FormDataModel;
  updateField: (field: keyof FormDataModel, value: any) => void;
  nextStep: () => void;
  subassuntosMap: Record<string, string[]>;
}

export function Step1({ formData, updateField, nextStep, subassuntosMap }: Step1Props) {
  const hasSubassuntos =
    Array.isArray(subassuntosMap[formData.assunto]) &&
    subassuntosMap[formData.assunto].length > 0;

  const anexosObrigatorios = [
    "Fiz uma compra de crédito e o valor não está disponível",
    "Quero falar sobre um jogo que eu fiz",
    "Não consigo concluir meu cadastro",
    "O valor do meu prêmio veio errado",
  ];
  const isAnexoObrigatorio = anexosObrigatorios.includes(formData.assunto);

  return (
    <div className="flex flex-col gap-4 text-[#808285]">
      <div className="text-[#1D7400] text-center p-5 bg-[#70C752]/10 border border-solid border-[#70C752] rounded-[10px]">
        Preencha as informações abaixo para que possamos entender melhor sua solicitação e te responder da melhor forma e o mais rápido possível.
      </div>

      <label>
        Assunto <span className="text-red-500">*</span>
      </label>
      <select
        value={formData.assunto}
        onChange={(e) => updateField("assunto", e.target.value)}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecione...</option>
        {Object.keys(subassuntosMap).map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {hasSubassuntos && (
        <>
          <label>
            Subassunto <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.subassunto}
            onChange={(e) => updateField("subassunto", e.target.value)}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Selecione...</option>
            {subassuntosMap[formData.assunto].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      )}

      <label>
        Anexar imagem ou PDF{" "}
        {isAnexoObrigatorio && <span className="text-red-500">*</span>}
      </label>
    <input
      type="file"
      accept=".pdf,image/*"
      multiple
      onChange={(e) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : [];
        const currentFiles = Array.isArray(formData.files) ? formData.files : [];
        updateField("files", [...currentFiles, ...newFiles]); // acumula
      }}
      className="border rounded px-3 py-2"
    />


     {Array.isArray(formData.files) && formData.files.length > 0 && (
      <ul className="text-sm text-gray-600 list-disc pl-5">
        {formData.files.map((file, idx) => (
          <li key={idx}>{file.name}</li>
        ))}
      </ul>
    )}


    <label>
  Mensagem <span className="text-gray-400 text-sm">(opcional)</span>
</label>
<textarea
  value={formData.solicitacao}
  onChange={(e) => updateField("solicitacao", e.target.value)}
  rows={4}
  className="border rounded px-3 py-2"
/>
      <button
        type="button"
        onClick={() => {
          if (!formData.assunto) {
            alert("O campo Assunto é obrigatório");
            return;
          }
          if (hasSubassuntos && !formData.subassunto) {
            alert("O campo Subassunto é obrigatório");
            return;
          }
          if (isAnexoObrigatorio && (!formData.files || formData.files.length === 0)) {
            alert("É obrigatório anexar pelo menos um arquivo para este assunto");
            return;
          }
          nextStep();
        }}
        className="bg-[#427E00] rounded-[10px] text-white py-2 hover:bg-green-900"
      >
        Próximo passo
      </button>
    </div>
  );
}
