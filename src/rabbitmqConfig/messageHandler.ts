
import { messageRespository } from "../repositiory/messageRepository";
import rabbitClient from "./client";



export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = data
        console.log("The operation is", operation, data);

        switch (operation) {
            case "chat":
                console.log(data, '------------------------');
                const { chatId, userId, message, filePath, fileType } = data;
                response = await messageRespository.sendMessage(chatId, userId, message, filePath, fileType);
                break;

            default:
                response = "Request-key notfound";
                break;
        }

        //Produce the response back to the client
        await rabbitClient.produce(response, correlationId, replyTo);
    }
}
