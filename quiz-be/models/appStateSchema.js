import mongoose from "mongoose";
const { Schema } = mongoose;

/** app state */
const appStateModel = new Schema({
  turnOn: Boolean, // No need for default here
  turnOff: Boolean, // No need for default here
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now }
});

export default mongoose.model('appState', appStateModel);
