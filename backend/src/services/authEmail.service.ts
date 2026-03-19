import crypto from "crypto"
import nodemailer from 'nodemailer'

export async function authEmail(email: string) {

    const code = crypto.randomInt(100000, 999999);
    const codeString = String(code);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'workmailtest404@gmail.com',
            pass: 'plzy mqne imum ozbc'
        }
    });
    const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background-color:#f4f6fb; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
    <!-- Container -->
    <table width="100%" cellpadding="0" cellspacing="0" 
           style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background-color:#031b83; padding:20px; text-align:center;">
          <img src="https://i.ibb.co/qMm9cpwN/Go-Docs-Logo.png" 
               width="140" 
               style="max-width:100%; height:auto; margin-bottom:10px;" />
          <h1 style="color:#ffffff; margin:0; font-size:20px;">
            Confirme seu email
          </h1>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:25px;">
          <p style="font-size:15px;">
            Seu código de confirmação é:
          </p>
          <div style="
            font-size:26px;
            font-weight:bold;
            color:#5170ff;
            text-align:center;
            margin:20px 0;
            letter-spacing:6px;
          ">
            ${code}
          </div>
          <p style="color:#666; font-size:13px; text-align:center;">
            Esse código expira em alguns minutos.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
  </table>
</body>
</html>;`
    await transporter.sendMail({
        from: "workmailtest404@gmail.com",
        to: String(email),
        subject: "testenodemailer",
        html: htmlTemplate
    });
    console.log("authEmail service end")
    const hashCode = crypto.createHash('sha256').update(codeString).digest('hex')
    console.log(hashCode)
    return hashCode
}