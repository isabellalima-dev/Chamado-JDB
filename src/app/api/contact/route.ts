import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const assunto = formData.get("assunto")?.toString() || "";
    const subassunto = formData.get("subassunto")?.toString() || "";
    const solicitacao = formData.get("solicitacao")?.toString() || "";

    const nome = formData.get("nome")?.toString() || "";
    const cpf = formData.get("cpf")?.toString() || "";
    const nascimento = formData.get("nascimento")?.toString() || "";
    const emailExtra = formData.get("emailExtra")?.toString() || "";
    const telefone = formData.get("telefone")?.toString() || "";

    const files = formData.getAll("files");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_SENDER_APP_PASSWORD,
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Formulário" <${process.env.MAIL_SENDER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: "Novo formulário enviado",
      html: `
        <h2>Dados do formulário</h2>
        <p><b>Assunto:</b> ${assunto}</p>
        <p><b>Subassunto:</b> ${subassunto}</p>
        <p><b>Solicitação:</b> ${solicitacao}</p>
        <hr />
        <h3>Informações adicionais</h3>
        ${nome ? `<p><b>Nome:</b> ${nome}</p>` : ""}
        ${cpf ? `<p><b>CPF:</b> ${cpf}</p>` : ""}
        ${nascimento ? `<p><b>Data de nascimento:</b> ${nascimento}</p>` : ""}
        ${emailExtra ? `<p><b>E-mail:</b> ${emailExtra}</p>` : ""}
        ${telefone ? `<p><b>Telefone:</b> ${telefone}</p>` : ""}
      `,
      attachments: [],
    };

    for (const file of files) {
      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        mailOptions.attachments!.push({
          filename: (file as File).name,
          content: buffer,
        });
      }
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email enviado com sucesso!" });
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { message: "Erro ao enviar email", error: error.message },
      { status: 500 }
    );
  }
}
