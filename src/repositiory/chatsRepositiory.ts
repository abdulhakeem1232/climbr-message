import ChatModel from "../model/chatsMode"

export const chatRepositiory = {
    createChat: async (user1: string, user2: string) => {
        try {
            let chat = await ChatModel.findOne({
                participants: { $all: [user1, user2] }
            });
            if (chat) {
                console.log(chat, 'already');
                return { success: true, chatId: chat._id }

            } else {
                chat = new ChatModel({
                    participants: [user1, user2]
                });
                console.log(chat, 'added');
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
            const chatlist = await ChatModel.aggregate([
                { $match: { participants: userId } },
                {
                    $lookup: {
                        from: "messages",
                        localField: "_id",
                        foreignField: "chat",
                        as: 'messages'
                    }
                },
                {
                    $unwind: {
                        path: "$messages",
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $sort: { "messages.createdAt": -1 } },
                {
                    $group: {
                        _id: "$_id",
                        participants: { $first: "$participants" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        lastMessage: { $first: "$messages" }
                    }
                },
                { $sort: { "updatedAt": -1 } }
            ]);
            console.log(chatlist, '===============chatlist');
            return { chatlist };
        } catch (err) {
            console.error("Error while getting list of chats", err);
            return null;
        }
    }


}
