import mongoose, { Schema, Model } from "mongoose";

export interface IIncident {
  monitor: mongoose.Types.ObjectId;
  monitorName: string;
  url: string;
  title: string;
  status: "Ongoing" | "Resolved";
  severity: "Minor" | "Major" | "Critical";
  startedAt: Date;
  resolvedAt: Date | null;
  duration: number | null;
  reason: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const IncidentSchema = new Schema<IIncident>(
  {
    monitor: {
      type: Schema.Types.ObjectId,
      ref: "Monitor",
      required: true,
      index: true,
    },
    monitorName: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Resolved"],
      default: "Ongoing",
      index: true,
    },
    severity: {
      type: String,
      enum: ["Minor", "Major", "Critical"],
      default: "Major",
    },
    startedAt: {
      type: Date,
      default: Date.now,
      required: true,
      index: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
    reason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during Next.js hot reload
const Incident: Model<IIncident> =
  mongoose.models.Incident ||
  mongoose.model<IIncident>("Incident", IncidentSchema);

export default Incident;
