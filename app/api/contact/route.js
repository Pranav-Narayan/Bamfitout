// Email form data 
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // Transporter
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // // Email options
    // await transporter.sendMail({
    //   from: `"Contact Form" <${email}>`,
    //   to: process.env.EMAIL_USER, // where you receive mail
    //   subject: `New Contact Form Submission`,
    //   html: `
    //     <h3>New Message</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
