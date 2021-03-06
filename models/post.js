const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const PostSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String },
    image: {type: String },
    summary: { type: String, required: true },
    category: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author : { type: Schema.Types.ObjectId, ref: "User" },
    upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    voteScore : {type: Number, default: 0}
});

PostSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });

  // Always populate the author field
PostSchema
.pre('findOne', Populate('author'))
.pre('find', Populate('author'))

module.exports = mongoose.model("Post", PostSchema);