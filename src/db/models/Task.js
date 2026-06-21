import { Schema, model } from 'mongoose';
import { PRIORITYS } from '../../constants/index.js';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: PRIORITYS,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true },
);

export const Task = model('Task', taskSchema);
