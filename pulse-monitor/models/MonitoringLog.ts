import mongoose, { Schema, Model } from "mongoose";

export interface IMonitoringLog {
  monitorId: mongoose.Types.ObjectId;
  monitor?: mongoose.Types.ObjectId;

  status: "Operational" | "Down";

  responseTime: number;

  statusCode: number | null;

  errorMessage: string | null;
  error?: string | null;

  checkedAt: Date;
}

const MonitoringLogSchema = new Schema<IMonitoringLog>(
  {
    monitorId: {
      type: Schema.Types.ObjectId,
      ref: "Monitor",
      required: true,
      index: true,
      alias: "monitor",
    },

    status: {
      type: String,
      enum: ["Operational", "Down"],
      required: true,
    },

    responseTime: {
      type: Number,
      required: true,
      min: 0,
    },

    statusCode: {
      type: Number,
      default: null,
    },

    errorMessage: {
      type: String,
      default: null,
      alias: "error",
    },

    checkedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during Next.js hot reload
const MonitoringLog: Model<IMonitoringLog> =
  mongoose.models.MonitoringLog ||
  mongoose.model<IMonitoringLog>(
    "MonitoringLog",
    MonitoringLogSchema
  );

export default MonitoringLog;
