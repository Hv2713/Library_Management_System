import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const userNotify = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: {
          $lt: oneDayAgo,
        },
        returnDate: null,
        notified: false,
      });

      console.log(borrowers.length);

      for(const element of borrowers){
        if(element.user && element.user.email){
            const user = await User.findById(element.user.id);
            sendEmail({
                email : element.user.email,
                subject: "Book Return Reminder",
                message: `Dear ${element.user.name}, \n\n This is a reminder that your book is due for return today. Please return it to the library as soon as possible. \n\n Thank You. `
            });
            element.notified=true;
            await element.save();
            console.log(`Email sent to ${element.user.email}`)
        }
      }

    } catch (error) {
        console.error("Some error occured while notifying the users.",error);
    }
  });
};
