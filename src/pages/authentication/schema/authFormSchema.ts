/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as yup from "yup";

export const formSchema = yup
  .object({
    username: yup
      .string()
      .required("username is required")
      .typeError("must be a valid username"),
    email: yup
      .string()
      .required("email is required")
      .typeError("Must be a vaild email"),
    password: yup.string().when("mode", {
      is: "login",
      then: yup.string().required("Password is required"),
    }),
    createpassword: yup.string().when("mode", {
      is: "signup",
      then: yup.string().required("Password is required"),
    }),
    repeatpassword: yup
      .string()
      .oneOf([yup.ref("createpassword"), null], "Passwords must match"),
  })
  .required();

export type AuthSchemaType = yup.InferType<typeof formSchema>;
