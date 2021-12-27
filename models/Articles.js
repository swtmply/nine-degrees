import { Schema, models, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: String,
    body: String,
    image: String,
    caption: String,

    writer: String,
    category: String,
    subsection: String,
    tags: [String],

    comments: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Draft",
    },
  },
  { timestamps: true }
);

export default models.Article || model("Article", articleSchema);
