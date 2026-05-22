import mongoose, { Document } from "mongoose";
export interface IMenu extends Document {
    name: string;
    relatedId: string | null;
}
export declare const MenuModel: mongoose.Model<IMenu, {}, {}, {}, mongoose.Document<unknown, {}, IMenu, {}, mongoose.DefaultSchemaOptions> & IMenu & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMenu>;
//# sourceMappingURL=Menu.schema.d.ts.map