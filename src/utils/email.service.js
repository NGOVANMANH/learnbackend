import nodemailer from "nodemailer"

async function sendOTP(email, otp) {
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
        Xin chào, <br>

        Cảm ơn bạn đã đăng ký tài khoản với chúng tôi. Để hoàn tất quá trình đăng ký và bảo vệ tài khoản của bạn, chúng tôi cần xác thực địa chỉ email của bạn. <br>
        
        Vui lòng sử dụng mã OTP dưới đây để xác thực email của bạn: <br>
        
        Mã OTP: ${otp} <br>
        
        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Xin lưu ý rằng mã OTP chỉ có hiệu lực trong một khoảng thời gian ngắn và chỉ được sử dụng một lần. <br>
        
        Xin cảm ơn, <br>
        Ngô Văn Mạnh.        
        `
    })
}


export {
    sendOTP,
}