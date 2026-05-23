import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document {
    id: string;
    name: string;
    relatedId: string | null;
}

const MenuSchema: Schema = new Schema<IMenu>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        relatedId: {
            type: String,
            ref: 'Menu',
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const MenuModel = mongoose.model<IMenu>("Menu", MenuSchema);