"use client";
import { useState } from "react";
import { Form } from "@/componentes/form";
import { Sucess } from "@/componentes/sucess";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex h-auto pt-10 pb-10 flex-col bg-[#F8F8EB] items-center justify-center">
      {!isSuccess ? (
        <Form onSuccess={() => setIsSuccess(true)} />
      ) : (
        <Sucess onReset={() => setIsSuccess(false)} />
      )}
    </div>
  );
}
