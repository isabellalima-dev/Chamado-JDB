"use client";
import React from "react";
import Image from "next/image";
import Voltar from "@/assets/icons/voltar.svg";
import { FormDataModel } from "@/models/types";

const onlyLetters = (value: string) => value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

const formatPhoneBR = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2")
    .slice(0, 15);
};

const formatDate = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1")
    .slice(0, 10);
};

const isAdult = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return false;
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const hasBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return age > 18 || (age === 18 && hasBirthday);
};

interface Step2Props {
  formData: FormDataModel;
  updateField: (field: keyof FormDataModel, value: any) => void;
  prevStep: () => void;
  handleSubmit: () => void;
  loading: boolean;
}

export function Step2({ formData, updateField, prevStep, handleSubmit, loading }: Step2Props) {
  return (
    <div className="flex flex-col gap-4 text-[#808285]">
      <div className="text-[#1D7400] text-center p-5 bg-[#70C752]/10 border border-solid border-[#70C752] rounded-[10px]">
        Para finalizar, precisamos de algumas informações para entrar em contato com você.
      </div>

      {formData.assunto === "Esqueci a minha senha" && (
        <>
          <label>Nome completo <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.nome} onChange={(e) => updateField("nome", onlyLetters(e.target.value))} className="border rounded px-3 py-2" />

          <label>CPF <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.cpf} onChange={(e) => updateField("cpf", formatCPF(e.target.value))} className="border rounded px-3 py-2" />

          <label>Data de nascimento <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            placeholder="DD/MM/AAAA"
            value={formData.nascimento}
            onChange={(e) => updateField("nascimento", formatDate(e.target.value))}
            onBlur={() => {
              if (formData.nascimento && !isAdult(formData.nascimento)) {
                alert("Você precisa ter 18 anos completos.");
                updateField("nascimento", "");
              }
            }}
            className="border rounded px-3 py-2"
          />

          <label>E-mail <span className="text-red-500">*</span></label>
          <input type="email" required value={formData.emailExtra} onChange={(e) => updateField("emailExtra", e.target.value)} className="border rounded px-3 py-2" />

          <label>Celular <span className="text-red-500">*</span></label>
          <input type="tel" required value={formData.telefone} onChange={(e) => updateField("telefone", formatPhoneBR(e.target.value))} className="border rounded px-3 py-2" />
        </>
      )}

      {formData.assunto === "Solicitei um saque e não recebi" && (
        <>
          <label>E-mail cadastrado <span className="text-red-500">*</span></label>
          <input type="email" required value={formData.emailExtra} onChange={(e) => updateField("emailExtra", e.target.value)} className="border rounded px-3 py-2" />

          <label>Telefone <span className="text-red-500">*</span></label>
          <input type="tel" required value={formData.telefone} onChange={(e) => updateField("telefone", formatPhoneBR(e.target.value))} className="border rounded px-3 py-2" />

          <label>CPF <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.cpf} onChange={(e) => updateField("cpf", formatCPF(e.target.value))} className="border rounded px-3 py-2" />
        </>
      )}

      {[
        "O resultado do meu jogo não está no aplicativo",
        "Quero falar sobre um jogo que eu fiz",
        "Não consigo concluir meu cadastro",
      ].includes(formData.assunto) && (
        <>
          <label>Nome completo <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.nome} onChange={(e) => updateField("nome", onlyLetters(e.target.value))} className="border rounded px-3 py-2" />

          <label>E-mail <span className="text-red-500">*</span></label>
          <input type="email" required value={formData.emailExtra} onChange={(e) => updateField("emailExtra", e.target.value)} className="border rounded px-3 py-2" />

          <label>Telefone <span className="text-red-500">*</span></label>
          <input type="tel" required value={formData.telefone} onChange={(e) => updateField("telefone", formatPhoneBR(e.target.value))} className="border rounded px-3 py-2" />
        </>
      )}

      {formData.assunto === "Fiz uma compra de crédito e o valor não está disponível" && (
        <>
         <label>Nome completo <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.nome} onChange={(e) => updateField("nome", onlyLetters(e.target.value))} className="border rounded px-3 py-2" />

          <label>E-mail <span className="text-red-500">*</span></label>
          <input type="email" required value={formData.emailExtra} onChange={(e) => updateField("emailExtra", e.target.value)} className="border rounded px-3 py-2" />

          <label>Telefone <span className="text-red-500">*</span></label>
          <input type="tel" required value={formData.telefone} onChange={(e) => updateField("telefone", formatPhoneBR(e.target.value))} className="border rounded px-3 py-2" />
        </>
      )}

      {["Indiquei e não recebi meu bônus", "O valor do meu prêmio veio errado"].includes(formData.assunto) && (
        <>
          <label>Nome completo <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.nome} onChange={(e) => updateField("nome", onlyLetters(e.target.value))} className="border rounded px-3 py-2" />

          <label>E-mail <span className="text-red-500">*</span></label>
          <input type="email" required value={formData.emailExtra} onChange={(e) => updateField("emailExtra", e.target.value)} className="border rounded px-3 py-2" />

          <label>CPF <span className="text-red-500">*</span></label>
          <input type="text" required value={formData.cpf} onChange={(e) => updateField("cpf", formatCPF(e.target.value))} className="border rounded px-3 py-2" />

          <label>Telefone <span className="text-red-500">*</span></label>
          <input type="tel" required value={formData.telefone} onChange={(e) => updateField("telefone", formatPhoneBR(e.target.value))} className="border rounded px-3 py-2" />
        </>
      )}

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="bg-[#E5E7EB] flex items-center justify-center gap-2 w-[50%] rounded-[10px] text-[#364153] py-2 hover:bg-gray-300"
        >
          <Image src={Voltar} alt="voltar" />
          <p>Voltar</p>
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#427E00] w-[50%] rounded-[10px] text-white py-2 hover:bg-green-900"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
