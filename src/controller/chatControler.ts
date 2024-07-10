import { chatService } from "../services/chatService";

export const chatController = {
    createChats: async (call: any, callback: any) => {
        try {
            const { userId, guestId } = call.request
            let response = await chatService.createChat(userId, guestId)
            callback(null, response)
        } catch (err) {
            callback(err)
        }
    },
    getChatsList: async (call: any, callback: any) => {
        try {
            const { userId } = call.request
            console.log(call.request, '000000');

            let response = await chatService.getChatList(userId)
            callback(null, response)
        } catch (err) {
            callback(err)
        }
    },

}
