import { messageService } from "../services/messageService";

export const mesageController = {
    getMessages: async (call: any, callback: any) => {
        try {
            const { chatId } = call.request
            console.log(call.request, 'message');
            const response = await messageService.getMessages(chatId)
            console.log(response, 'mesgaeres');

            callback(null, response)
        } catch (err) {
            callback(err)
        }
    },
}
