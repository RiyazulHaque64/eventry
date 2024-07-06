import { TLoginCredential } from "@/interfaces/auth";
import eventModel from "@/models/event-model";
import usersModel from "@/models/user-model";
import {
  MongoItem,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { Types } from "mongoose";

export const getAllEvents = async (query: string) => {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i");
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }
  return replaceMongoIdInArray(allEvents as any);
};

export const getSingleEvent = async (id: string) => {
  const res = await eventModel.findById(id).lean();
  return replaceMongoIdInObject(res as any);
};

export const createUser = async (user: any) => {
  const res = await usersModel.create(user);
  return res;
};

export const loginWithCredential = async (credential: TLoginCredential) => {
  const user = await usersModel
    .findOne(credential)
    .lean()
    .select({ password: false });
  if (!user) {
    throw Error("Something went wrong");
  }
  return replaceMongoIdInObject(user as MongoItem);
};

export const updateInterestIntoDB = async (eventId: string, userId: string) => {
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id: Types.ObjectId) => id.toString() === userId
    );
    if (foundUsers) {
      event.interested_ids.pull(new Types.ObjectId(userId));
    } else {
      event.interested_ids.push(new Types.ObjectId(userId));
    }
  }
  event.save();
};

export const updateGoing = async (eventId: string, userId: string) => {
  const event = await eventModel.findById(eventId);
  event.going_ids.push(new Types.ObjectId(userId));
  event.save();
};
