"use server";

import EmailTemplate from "@/components/payment/EmailTemplate";
import {
  createUser,
  getSingleEvent,
  loginWithCredential,
  updateGoing,
  updateInterestIntoDB,
} from "@/db/queries";
import { TLoginCredential } from "@/interfaces/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export const registerUser = async (formData: FormData) => {
  const user = Object.fromEntries(formData);
  const createdUser = await createUser(user);
  redirect("/login");
  console.log(createdUser);
};

export const performLogin = async (formData: FormData) => {
  try {
    const loginInfo = Object.fromEntries(formData) as TLoginCredential;
    const loginResponse = await loginWithCredential(loginInfo);
    return loginResponse;
  } catch (error) {
    throw error;
  }
};

export const addInterestedEvent = async (eventId: string, userId: string) => {
  try {
    await updateInterestIntoDB(eventId, userId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
};

export const addGoingEvent = async (eventId: string, user: any) => {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
};

export const sendEmail = async (eventId: string, user: any) => {
  try {
    const event = (await getSingleEvent(eventId)) as any;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event ${event?.name}. Please carry this email and your official id to the venue. we are excited to have you here`;
    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user?.email,
      subject: "Successfully registered for the event",
      react: EmailTemplate({ message }),
    });
    console.log(sent);
  } catch (error) {
    throw error;
  }
};
