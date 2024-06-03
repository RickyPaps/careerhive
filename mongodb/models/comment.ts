import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models } from "mongoose";

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends ICommentBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

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
export const Comment = models.Comment || mongoose.model<IComment>("Comment", commentSchema);

