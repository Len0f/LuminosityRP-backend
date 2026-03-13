import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  icon: { type: String, default: "📋" },
  color: { type: String, default: "default" },
  order: { type: Number, default: 0 },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  cards: [cardSchema],
});

const tabSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    emoji: { type: String, default: "📄" },
    accentColor: { type: String, default: "#e74c3c" },
    sections: [sectionSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Tab", tabSchema);
