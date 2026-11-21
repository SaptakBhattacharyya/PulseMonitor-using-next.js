import mongoose, { Schema, Model } from "mongoose";

export interface IMonitor {
  name: string;
  url: string;
  method: "GET" | "HEAD" | "POST";
  interval: number;
  timeout: number;

  status: "Operational" | "Down" | "Pending";
  uptime: number;
  response: number;
  responseTime?: number;
  statusCode: number | null;

  isActive: boolean;
  lastChecked: Date | null;
  nextCheck: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

const MonitorSchema = new Schema<IMonitor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    method: {
      type: String,
      enum: ["GET", "HEAD", "POST"],
      default: "GET",
    },

    interval: {
      type: Number,
      required: true,
      default: 5,
    },

    timeout: {
      type: Number,
      required: true,
      default: 30,
    },

    status: {
      type: String,
      enum: ["Operational", "Down", "Pending"],
      default: "Pending",
    },

    uptime: {
      type: Number,
      default: 100,
    },

    response: {
      type: Number,
      default: 0,
      alias: "responseTime",
    },

    statusCode: {
      type: Number,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastChecked: {
      type: Date,
      default: null,
    },

    nextCheck: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation errors during Next.js hot reload
const Monitor: Model<IMonitor> =
  mongoose.models.Monitor ||
  mongoose.model<IMonitor>("Monitor", MonitorSchema);

export default Monitor;
