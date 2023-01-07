
import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: true,
        trim: true,
        maxlength: [50, "Title cannot be more than 50 characters"]

    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
        maxlength: [200, "Description cannot be more than 520 characters"]
    }

}, {
    timestamps: true,
    versionKey: false

});


export default models.Task || model("Task", taskSchema);

