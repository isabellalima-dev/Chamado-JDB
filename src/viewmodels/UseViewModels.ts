"use client";
import { useState } from "react";
import { FormDataModel } from "@/models/types";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidCPF = (cpf: string) => cpf.replace(/\D/g, "").length === 11;
const isValidPhone = (phone: string) => phone.replace(/\D/g, "").length >= 10;

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

export function useFormViewModel(onSuccess?: () => void) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataModel>({
    assunto: "",
    subassunto: "",
    files: [], 
    solicitacao: "",
    nome: "",
    cpf: "",
    nascimento: "",
    emailExtra: "",
    telefone: "",
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormDataModel, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const validate = (): boolean => {
    let requiredFields: (keyof FormDataModel)[] = [];

    switch (formData.assunto) {
      case "Esqueci a minha senha":
        requiredFields = ["nome", "cpf", "nascimento", "emailExtra", "telefone"];
        break;
      case "Solicitei um saque e não recebi":
        requiredFields = ["emailExtra", "telefone", "cpf"];
        break;
      case "O resultado do meu jogo não está no aplicativo":
      case "Quero falar sobre um jogo que eu fiz":
      case "Não consigo concluir meu cadastro":
        requiredFields = ["nome", "emailExtra", "telefone"];
        break;
      case "Fiz uma compra de crédito e o valor não está disponível":
        requiredFields = ["solicitacao"];
        break;
      case "Indiquei e não recebi meu bônus":
      case "O valor do meu prêmio veio errado":
        requiredFields = ["nome", "emailExtra", "cpf", "telefone"];
        break;
      default:
        break;
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`O campo ${field} é obrigatório`);
        return false;
      }
    }

    if (requiredFields.includes("emailExtra") && !isValidEmail(formData.emailExtra)) {
      alert("Digite um e-mail válido");
      return false;
    }
    if (requiredFields.includes("cpf") && !isValidCPF(formData.cpf)) {
      alert("Digite um CPF válido com 11 dígitos");
      return false;
    }
    if (requiredFields.includes("telefone") && !isValidPhone(formData.telefone)) {
      alert("Digite um celular válido com DDD");
      return false;
    }
    if (requiredFields.includes("nascimento") && !isAdult(formData.nascimento)) {
      alert("Você precisa ter 18 anos completos");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    const data = new FormData();

    formData.files.forEach((file) => {
      data.append("files", file);
    });

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "files" && value) {
        data.append(key, value as any);
      }
    });

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok) {
        onSuccess?.();
      } else {
        alert(result.message || "Erro ao enviar");
      }
    } catch {
      alert("Erro ao enviar");
    } finally {
      setLoading(false);
    }
  };

  return { step, formData, updateField, nextStep, prevStep, handleSubmit, loading };
}
