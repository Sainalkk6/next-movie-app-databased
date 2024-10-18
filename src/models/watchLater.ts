import mongoose, { Schema, Document, Model } from "mongoose";

interface WatchLaterDocument extends Document {
  id: number;
  email: string;
}

const watchLaterSchema = new Schema<WatchLaterDocument>({
  id: { type: Number, required: true },
  email: { type: String, required: true },
});

export const WatchLater: Model<WatchLaterDocument> =
  mongoose.models.WatchLater || mongoose.model<WatchLaterDocument>("WatchLater", watchLaterSchema);
