import { chatRepositiory } from "../repositiory/chatsRepositiory";

export const chatService = {
    createChat: async (user1: string, user2: string) => {
        try {
            let response = await chatRepositiory.createChat(user1, user2)
            return response
        } catch (err) {
            console.log("Error while creating chats", err);

        }
    },
    getChatList: async (user: string) => {
        try {
            let response = await chatRepositiory.getChatList(user)
            return response
        } catch (err) {
            console.log("Error while creating chats", err);

        }
    },

}
