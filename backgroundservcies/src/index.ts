import express, { json, urlencoded } from "express";
import { welcomeUser } from "./mailServices/welcomeuser";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import path from "path";
import { sendResetTokenByEmail } from "./mailServices/resetPassword";
dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

const run = async () => {
  cron.schedule("*/10 * * * * *", async () => {
    console.log("Checking for new user");
    await welcomeUser();
    await sendResetTokenByEmail();
  });
};

run();

app.listen(port, () => {
  console.log(port);

  console.log(`Node mailer is app and runnning on ${port}`);
});
