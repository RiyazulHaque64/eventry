import { IEvent } from "@/interfaces/event-interface";
import { Schema, model, models } from "mongoose";

const schema = new Schema<IEvent>({
  name: {
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  imageUrl: {
    required: true,
    type: String,
  },
  interested_ids: {
    type: [String],
    default: [],
  },
  going_ids: {
    type: [String],
    default: [],
  },
  swags: {
    type: [String],
    default: [],
  },
});

const eventModel = models.events ?? model<IEvent>("events", schema);

export default eventModel;
