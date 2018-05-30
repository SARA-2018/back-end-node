import mongoose from "mongoose";

const Session = new mongoose.Schema({
    name: { type: String, required: true },
    sessionItinerary: { type: mongoose.Schema.Types.ObjectId, ref: "SessionsItinerary", required: true },
});

const SessionSchema = mongoose.model("Session", Session);
export default SessionSchema;