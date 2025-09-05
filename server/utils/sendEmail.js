import nodeMailer from "nodemailer";

export const sendEmail = async ({email, subject, message}) => {
    try {

        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_FROM_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            tls :{
                rejectUnauthorized: false,
            }
        });
        
        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject,    
            html: message,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};