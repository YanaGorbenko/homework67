import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenExpiresAt: {
      type: Date,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

sessionSchema.index({ userId: 1 });

export const Session = model('Session', sessionSchema);
