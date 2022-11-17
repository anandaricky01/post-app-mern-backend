import { body } from "express-validator";
import User from "../models/user.model.js";

export const emailRegistration = body(
  "email",
  "Please enter a Valid Email Format!"
)
  .isEmail()
  .custom((value) => {
    return User.findOne({ email: value }).then((result) => {
      if (result) {
        return Promise.reject(
          "Email has been registered in our Record! Use another Valid Email!"
        );
      }
    });
  })
  .normalizeEmail();

export const passwordRegistration = body(
  "password",
  "Password at least has 6 characters in Alphanumerical!"
).isLength({ min: 6 });

export const passwordConfirmation = body("passwordConfirmation").custom(
  (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }
);
