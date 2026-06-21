import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendMatchEmail(
  to: string,
  matchName: string
) {
  return resend.emails.send({
    from: "SocioN <noreply@socion.com.br>",
    to,
    subject: `Você fez match com ${matchName} no SocioN!`,
    html: `
      <h1>Você tem um novo match!</h1>
      <p>${matchName} também tem interesse em você como sócio.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/app/matches">Ver match</a></p>
    `,
  });
}

export async function sendProposalEmail(
  to: string,
  fromName: string
) {
  return resend.emails.send({
    from: "SocioN <noreply@socion.com.br>",
    to,
    subject: `${fromName} enviou uma proposta de sociedade`,
    html: `
      <h1>Nova proposta recebida</h1>
      <p>${fromName} enviou uma proposta de sociedade para você.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/app/partnerships">Ver proposta</a></p>
    `,
  });
}
