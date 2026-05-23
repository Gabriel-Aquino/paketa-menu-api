import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document<string> {
    _id: string;
    name: string;
    relatedId: string | null;
}

const MenuSchema: Schema = new Schema<IMenu>(
    {
        _id: {
            type: String,
            required: true
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