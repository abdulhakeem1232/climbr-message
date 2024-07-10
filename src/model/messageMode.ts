import mongoose, { Document, Schema } from "mongoose";
export interface IMessage extends Document {
    chat: mongoose.Schema.Types.ObjectId;
    sender: string;
    receiver: string;
    message?: string;
    createdAt: Date;
    filePath?: string;
    fileType?: string;
}

const MessageSchema: Schema<IMessage> = new Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: String, },
    message: { type: String },
    filePath: { type: String },
    fileType: { type: String },
}, { timestamps: true });

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
