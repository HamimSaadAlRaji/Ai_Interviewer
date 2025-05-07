"use server";

import { db } from "@/firebase/admin";

export const signUp = async (params: SignUpParams) => {
  const { uid, name, email, password } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
    });
  } catch (e: any) {
    console.log(e);
    if (e.code === "auth/email-already-in-use") {
      console.log("Email already in use");
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: e.message,
    };
  }
};
