import { IUser } from "@/types/user";
import type { User } from '@clerk/backend';
import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ICommentBase {
  user: User;
  text: string;
}

export interface IComment extends ICommentBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface ICommentModel extends Model<IComment> {}

const commentSchema = new Schema<IComment>(
  {
    user: {
      userID: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * `models.Comment` is a property of the `models` object provided by Mongoose.
 * It represents the model for the "Comment" collection in the database.
 * If `models.Comment` is already defined, it will be used, otherwise a new model will be created.
 * The new model is defined using the `commentSchema` schema and the name "Comment".
 * The return value of this statement is assigned to the `Comment` constant.
 */
export const Comment = models.Comment as ICommentModel || mongoose.model<IComment>("Comment", commentSchema);

