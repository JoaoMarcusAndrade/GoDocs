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
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoDocs - Confirmação de E-mail</title>
</head>
<body style="margin:0; padding:0; background: linear-gradient(135deg, #f5f7fc 0%, #eef2f9 100%); font-family: 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container principal -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
          
          <!-- Header com padrão geométrico sutil -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a2b5e 0%, #0f3b7a 100%); padding: 32px 24px; text-align: center; position: relative;">
              <div style="margin-bottom: 16px;">
                <span style="font-size: 48px; font-weight: 800; color: #ffffff; letter-spacing: -1px;">Go</span>
                <span style="font-size: 48px; font-weight: 500; color: #6c9eff; letter-spacing: -1px;">Docs</span>
              </div>
              <div style="width: 50px; height: 3px; background: #6c9eff; margin: 0 auto 16px; border-radius: 3px;"></div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500; letter-spacing: -0.3px;">
                Verifique seu e-mail
              </h1>
              <p style="color: rgba(255,255,255,0.85); margin: 12px 0 0; font-size: 14px;">
                Entrega segura de documentos
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 32px;">
              <p style="font-size: 15px; color: #1a2c3e; line-height: 1.5; margin: 0 0 8px 0;">
                Olá,
              </p>
              <p style="font-size: 15px; color: #1a2c3e; line-height: 1.5; margin: 0 0 28px 0;">
                Para garantir a segurança da sua conta e prosseguir com o envio do documento, utilize o código de confirmação abaixo:
              </p>
              
              <!-- Código de confirmação - destaque principal -->
              <div style="background: #f8faff; border: 1px solid #e4e9f2; border-radius: 20px; padding: 8px; margin-bottom: 28px;">
                <div style="background: #ffffff; border-radius: 16px; padding: 24px 16px; text-align: center;">
                  <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #6c9eff; font-weight: 600;">Código de acesso</span>
                  <div style="font-size: 42px; font-weight: 700; color: #0a2b5e; margin: 12px 0 0; letter-spacing: 8px; font-family: 'SF Mono', 'Roboto Mono', monospace;">
                    ${code}
                  </div>
                </div>
              </div>
              
              <div style="background: #f8faff; border-radius: 16px; padding: 20px; margin-bottom: 28px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 40px; vertical-align: top;">
                      <span style="font-size: 20px;">⏱️</span>
                    </td>
                    <td style="vertical-align: top;">
                      <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #0a2b5e;">Válido por tempo limitado</p>
                      <p style="margin: 0; font-size: 13px; color: #5a6e8a; line-height: 1.4;">
                        Este código expira em <strong style="color:#0a2b5e;">10 minutos</strong> por questões de segurança.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 40px; vertical-align: top; padding-top: 16px;">
                      <span style="font-size: 20px;">🔒</span>
                    </td>
                    <td style="vertical-align: top; padding-top: 16px;">
                      <p style="margin: 0; font-size: 13px; color: #5a6e8a; line-height: 1.4;">
                        Nunca compartilhe este código com ninguém. A GoDocs não solicita esse código por telefone ou mensagem.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 13px; color: #6c7a91; text-align: center; margin: 0 0 8px 0; border-top: 1px solid #eef2f9; padding-top: 24px;">
                Se você não solicitou este código, pode ignorar este e-mail com segurança.
              </p>
              <p style="font-size: 12px; color: #8e9db2; text-align: center; margin: 0;">
                © 2025 GoDocs · Entrega e envio de documentos
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
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