import MessageModel from "../model/messageMode";
import ChatModel from "../model/chatsMode";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const access_key = process.env.ACCESS_KEY
const secret_access_key = process.env.SECRET_ACCESS_KEY
const bucket_region = process.env.BUCKET_REGION
const bucket_name = process.env.BUCKET_NAME
if (!access_key || !secret_access_key) {
    throw new Error("AWS credentials are not provided.");
}
const s3: S3Client = new S3Client({
    credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_access_key
    },
    region: process.env.BUCKET_REGION
});

export const messageRespository = {
    createMessage: async () => {
        try {

        } catch (err) {
            console.error(`Error creating message: ${err}`);
            return null;
        }
    },
    getMessage: async (chatId: string) => {
        try {
            let chats = await MessageModel.find({ chat: chatId })
            for (let chat of chats) {
                if (chat.filePath) {
                    const getObjectParams = {
                        Bucket: bucket_name,
                        Key: chat.filePath,
                    }
                    const getObjectCommand = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
                    chat.filePath = url
                }
            }
            return { chats }
        } catch (err) {
            console.error("Error while get chats", err)
            return null;
        }
    },
    sendMessage: async (chatId: string, userId: string, message: string, filePath: string, fileType: string) => {
        try {
            console.log(chatId, userId, message);
            await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });
            let response = new MessageModel({
                chat: chatId, sender: userId, message: message, filePath: filePath, fileType: fileType
            })
            await response.save();
            return response
        } catch (err) {
            console.error("Error while updating chats", err)
            return null;
        }
    }
}
