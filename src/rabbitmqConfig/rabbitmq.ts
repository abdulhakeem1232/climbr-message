import amqp from 'amqplib';
import { messageRespository } from '../repositiory/messageRepository';

export async function GetMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'direct_exchange';
    const bindingKey = 'message_routing_key';

    await channel.assertExchange(exchange, 'direct', { durable: true });


    const queue = await channel.assertQueue("messageQueue", { durable: true });

    channel.bindQueue(queue.queue, exchange, bindingKey);


    channel.consume(queue.queue, async data => {
        if (data) {
            console.log('Received data:', data.content.toString());
            const messages = JSON.parse(data.content.toString());
            const { chatId, userId, message } = messages;

            await messageRespository.sendMessage(chatId, userId, message);
            channel.ack(data);
        }
    }, { noAck: false });
}
