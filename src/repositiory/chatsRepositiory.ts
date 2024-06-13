import ChatModel from "../model/chatsMode"

export const chatRepositiory = {
    createChat: async (user1: string, user2: string) => {
        try {
            let chat = await ChatModel.findOne({
                participants: { $all: [user1, user2] }
            });
            if (chat) {
                return { success: true, chatId: chat._id }
            } else {
                chat = new ChatModel({
                    participants: [user1, user2]
                });
                await chat.save();
                return { success: true, chatId: chat._id }
            }
        } catch (err) {
            console.error(`Error creating chats: ${err}`);
            return null;
        }
    },
    getChatList: async (userId: string) => {
        try {
            const chatlist = await ChatModel.find({ participants: userId })
            console.log('----', chatlist);
            return { chatlist };
        } catch (err) {
            console.error("Error while get lisdt of chats", err)
            return null;
        }
    },

}
