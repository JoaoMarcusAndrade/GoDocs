import crypto from "crypto"
import nodemailer from 'nodemailer'

export async function authEmail(email: string) {

    const code = crypto.randomInt(100000,999999);
    const codeString = String(code);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'workmailtest404@gmail.com',
            pass: 'plzy mqne imum ozbc'
        }
    });
    
    await transporter.sendMail({
        from: "workmailtest404@gmail.com",
        to: String(email),
        subject: "testenodemailer",
        text: String(code)
    });
    console.log("authEmail service end")
    const hashCode = crypto.createHash('sha256').update(codeString).digest('hex')
    console.log(hashCode)
    return hashCode
}