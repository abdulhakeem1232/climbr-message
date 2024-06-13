import { messageRespository } from "../repositiory/messageRepository"



export const messageService = {
    getMessages: async (chatId: string) => {
        try {
            let response = await messageRespository.getMessage(chatId)
            return response
        } catch (err) {
            console.error("Error while getting message", err)
        }
    },
}
