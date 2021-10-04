import { Schema, model, SchemaTypes } from 'mongoose';

const TaskSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true,
    }
}, { _id: false });

export default model('GamesMongo', TaskSchema);