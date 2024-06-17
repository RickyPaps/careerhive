import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models, Model } from "mongoose";
import { Comment, IComment, ICommentBase } from "./comment";

export interface IPostBase {
  user: IUser;
  text: string;
  imageUrl?: string;
  comments?: IComment[];
  likes?: string[];
}

export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}
// Define the document methods (for each instance of a post)
/**
 * Interface defining the document methods for each instance of a post.
 *
 * These methods include:
 * - `likePost(userId: string): Promise<void>`: A method to like a post.
 * - `unlikePost(userId: string): Promise<void>`: A method to unlike a post.
 * - `commentOnPost(comment: ICommentBase): Promise<void>`: A method to comment on a post.
 * - `getAllComments(): Promise<IComment[]>`: A method to get all comments on a post.
 * - `removePost(): Promise<void>`: A method to remove a post.
 */
interface IPostMethods {
  likePost(userId: string): Promise<void>;
  unlikePost(userId: string): Promise<void>;
  commentOnPost(comment: ICommentBase): Promise<void>;
  getAllComments(): Promise<IComment[]>;
  removePost(): Promise<void>;
}

interface IPostStatics {
  getAllPosts(): Promise<IPostDocument[]>;
}

/**
 * Interface representing a single post document.
 * It combines the `IPost` interface with the `IPostMethods` interface.
 * This is done to create a new interface that includes all the properties of a post
 * and the methods that can be called on a single post.
 */
export interface IPostDocument extends IPost, IPostMethods {}

/**
 * Interface representing a post model.
 * It combines the `IPostStatics` interface with the `Model<IPostDocument>` interface.
 * This is done to create a new interface that includes all the static methods for the Post model
 * and the methods that can be called on the model as a whole.
 */
interface IPostModel extends IPostStatics, Model<IPostDocument> {}

const PostSchema = new Schema<IPostDocument>(
  {
    user: {
      userID: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: { type: String },
    comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] },
    likes: { type: [String] },
  },
  {
    timestamps: true,
  },
);

PostSchema.methods.likePost = async function (userId: string) {
  // Add the userId to the "likes" array if it is not already in the array.
  // If the update is successful, the method will return without throwing an error.
  // If the update is unsuccessful, the error will be caught and re-thrown as a new error with the message "Failed to like post".
  try {
    await this.updateOne({ $addToSet: { likes: userId } });
  } catch (error) {
    throw new Error(`Failed to like post: ${error}`);
  }
};

PostSchema.methods.unlikePost = async function (userId: string) {
  // This code is using the `updateOne` method provided by Mongoose's `Document` class.
  // The `updateOne` method is used to update a single document in the database.
  // In this case, the first argument `{}` is an empty filter, which means it will update the document that matches the current document (the one that the method is called on).
  // The second argument `{ $pull: { likes: userId } }` is the update operation.
  // The `$pull` operator is used to remove a specific value from an array.
  // In this case, the value being removed from the `likes` array is the `userId` provided as an argument to the `unlikePost` method.
  // If the `updateOne` method is successful, the `likes` array will no longer contain the `userId` and the method will return without throwing an error.
  // If the `updateOne` method is unsuccessful, the error will be caught and re-thrown as a new error with the message "Failed to unlike post".
  try {
    await this.updateOne({ $pull: { likes: userId } });
  } catch (error) {
    throw new Error("Failed to unlike post");
  }
};

PostSchema.methods.removePost = async function () {
  try {
    // This code is using the `deleteOne` method provided by Mongoose's `Model` class.
    // The `deleteOne` method is used to delete a single document from the database.
    // In this case, the first argument `{ _id: this._id }` is the filter used to find the document to be deleted.
    // The `_id` property is set to the `_id` of the current document that the `removePost` method is called on.
    // If the `deleteOne` method is successful, the document will be deleted from the database and the method will return without throwing an error.
    // If the `deleteOne` method is unsuccessful, the error will be caught and re-thrown as a new error with the message "Failed to remove post".
    await this.model("Post").deleteOne({ _id: this._id });
  } catch (error) {
    throw new Error("Failed to remove post");
  }
};

PostSchema.methods.commentOnPost = async function (commentToAdd: ICommentBase) {
  try {
    // This code is creating a new comment using the `Comment.create` method provided by Mongoose's `Model` class.
    // The `create` method is used to create a new document in the database.
    // In this case, the `commentToAdd` argument is the data that will be used to create the new comment.
    // The `create` method returns a promise that resolves to the newly created document.
    // The newly created comment is then assigned to the `comment` variable.
    // The `this.comments.push(comment._id)` line is adding the `_id` of the newly created comment to the `comments` array of the current document.
    // The `await this.save()` line is saving the current document to the database.
    // This ensures that the `comments` array is updated with the new comment.
    const comment = await Comment.create(commentToAdd);
    this.comments.push(comment._id);
    await this.save();
  } catch (error) {
    throw new Error("Failed to comment on post");
  }
};

PostSchema.methods.getAllComments = async function () {
  // This code is using the `populate` method provided by Mongoose's `Document` class.
  // The `populate` method is used to replace references in a document with the actual documents.
  // In this case, the `comments` array in the current document is being replaced with the actual comments.
  // The `path` argument is set to "comments" which specifies the path to the array of comments.
  // The `options` argument is an object that allows you to specify options for the population.
  // In this case, the `sort` option is used to sort the comments by the `createdAt` field in descending order.
  // The `populate` method returns a promise that resolves to the populated document.
  // The populated `comments` array is then returned from the `getAllComments` method.
  // If the `populate` method is unsuccessful, the error will be caught and re-thrown as a new error with the message "Failed to get all comments".
  try {
    await this.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } }, // Sort comments by createdAt in descending order
    });
    return this.comments;
  } catch (error) {
    throw new Error("Failed to get all comments");
  }
};

PostSchema.statics.getAllPosts = async function () {
  try {
    // This code is using the `find` method provided by Mongoose's `Model` class.
    // The `find` method is used to find documents in the database that match a specified filter.
    // In this case, the filter is an empty object `{}`, which means that all documents in the collection will be returned.
    // The `sort` method is used to sort the documents returned from the `find` method in descending order of the `createdAt` field.
    // The `populate` method is used to replace references in the documents returned from the `find` method with the actual documents.
    // In this case, the `comments` array in each post is being replaced with the actual comments.
    // The `options` argument is an object that allows you to specify options for the population.
    // In this case, the `sort` option is used to sort the comments by the `createdAt` field in descending order.
    // The `lean` method is used to convert Mongoose objects to plain JS objects.
    // This is needed because Mongoose objects contain methods and other properties that are not needed in the JSON response.
    // The `map` method is used to transform the posts returned from the `find` method into the JSON response.
    // The `map` method takes a callback function that will be called for each post in the array.
    // The callback function takes the post as an argument and returns a new object that will be used in the JSON response.
    // The new object is created using the spread operator (`...`) to copy all the properties of the post into the new object.
    // The `_id` property is then replaced with a string version of the `_id` property.
    // The `comments` property is then replaced with a new array of comments that have been transformed in a similar way.
    const posts = await this.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
      })
      .lean(); //lean() to convert Mongoose objects to plain JS object

    return posts.map((post: IPostDocument) => ({
      ...post,
      _id: post._id && post._id.toString(),
      comments: post.comments?.map((comment: IComment) => ({
        ...comment,
        _id: comment._id && comment._id.toString(),
      })),
    }));
  } catch (error) {
    throw new Error("Failed to get all posts");
  }
};

/**
 * `models.Post` is a property of the `models` object provided by Mongoose.
 * It represents the model for the "Post" collection in the database.
 * If `models.Post` is already defined, it will be used, otherwise a new model will be created.
 * The new model is defined using the `PostSchema` schema and the name "Post".
 * The return value of this statement is assigned to the `Post` constant.
 */
export const Post =
  (models.Post as IPostModel) ||
  mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);
