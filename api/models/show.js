const mongoose = require("mongoose");
const { MongoGridFSChunkError } = require("mongoose/node_modules/mongodb");
const Schema = mongoose.Schema;

const showSchema = new Schema({
  showId: {
    type: String,
    required: true,
  },
  theatreId: {
    type: mongoose.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },
  showDetails: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Show", showSchema);
