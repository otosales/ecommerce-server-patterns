// src/utils/mail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: Number(process.env.MAIL_PORT || 1025),
  secure: false,
  // Mailhog normalmente não precisa de auth; se tiver, o .env pode definir MAIL_USER e MAIL_PASS
  auth:
    process.env.MAIL_USER && process.env.MAIL_PASS
      ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
      : undefined,
});

export const sendResetPasswordEmail = async (to: string, token: string) => {
  // Link que o usuário clicará (apontamos ao servidor; você pode trocar FRONTEND_URL se tiver front)
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;

  const html = `
    <p>Você solicitou redefinição de senha. Clique no botão abaixo para redefinir (válido por 1 hora):</p>
    <p>
      <a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#1a73e8;color:#ffffff;border-radius:6px;text-decoration:none;">
        Redefinir senha
      </a>
    </p>
    <p>Se você não solicitou, ignore este e-mail.</p>
  `;

  const info = await transporter.sendMail({
    from: `"Ecommerce" <no-reply@ecommerce.com>`,
    to,
    subject: "Redefinir sua senha",
    html,
  });

  console.log("E-mail de reset enviado (messageId):", info.messageId);
};