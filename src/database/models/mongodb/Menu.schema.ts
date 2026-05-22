import mongoose, { Schema, Document } from "mongoose";
import { Menu } from "../../../domain/entities/Menu.entities";

export interface IMenu extends Document {
    id: string;
    name: string;
    relatedId: mongoose.Types.ObjectId | null;
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
            type: Schema.Types.ObjectId,
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