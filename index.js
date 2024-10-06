import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
const app = express();
app.listen(5000, () => {
  console.log("done");
});

app.use(
  cors({
    origin: "*", // النطاق المسموح به
    credentials: true, // السماح بإرسال معلومات الاعتماد
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/api/sendMail", async (req, res, next) => {
  try {
    const { name, email, phone, rooms, state, message } = req.body;
    console.log({ name, email, phone, rooms, state, message });
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "marwanmamdouh159@gmail.com",
        pass: "casa yloo prts fdds",
      },
    });
    const mailOption = {
      from: {
        name: "marwan",
        address: '"marwanmamdouh159@gmail.com"',
      },
      to: "ibrahimyounes646@gmail.com",
      subject: "New Booking",
      text: "Done",
      html: `<b>name: ${name}</b><br/><b>email: ${email}</b><br/> <b>phone: ${phone}</b><br/><b>Number of Rooms: ${rooms}</b><br/><b>Name of State: ${state}</b><br/><b>Message: ${message}</b><br/>`,
    };
    await transport.sendMail(mailOption);
    console.log("done");
    return res.status(200).json({ message: "Done Send mail" });
  } catch (error) {
    console.log(error.message);
  }
});
