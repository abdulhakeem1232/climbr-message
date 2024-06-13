import MessageModel from "../model/messageMode";

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
            return { chats }
        } catch (err) {
            console.error("Error while get chats", err)
            return null;
        }
    },
    sendMessage: async (chatId: string, userId: string, message: string) => {
        try {
            console.log('in reo-----------r', chatId, userId, message);
            let response = new MessageModel({
                chat: chatId, sender: userId, message: message
            })
            await response.save()
            console.log(response, '9999999');
            return response
        } catch (err) {
            console.error("Error while updating chats", err)
            return null;
        }
    }
}
