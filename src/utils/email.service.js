import nodemailer from "nodemailer"

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_KEY
        }
    });

    transporter.sendMail({
        from: `Ngô Văn Mạnh <${process.env.EMAIL}>`,
        to: email,
        subject: "Verify your email",
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body>
                <p>Hello,</p>
                <p>Please click the following link to verify your email within the next hour:</p>
                <p><a href="http://localhost:${process.env.PORT || 3000}/api/auth/verify-email?token=${token}&key=${email}">Verify Email</a></p>
                <p>**This link will expire in 1 hour.**</p>
                <p>If you did not request this, please ignore this email.</p>
            </body>
        </html>
        `
    })
}


export {
    sendVerificationEmail,
}