import dotenv from 'dotenv'
import path from 'path'
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { connectDB } from './config/db';
import { chatController } from './controller/chatControler';
import { mesageController } from './controller/messageController';
import { GetMessage } from './rabbitmqConfig/rabbitmq'

dotenv.config()
connectDB()

const packageDefinition = protoLoader.loadSync(path.join(__dirname, "proto/message.proto"))
const messageProto = grpc.loadPackageDefinition(packageDefinition) as any;

const server = new grpc.Server();


const grpcServer = () => {
    server.bindAsync(
        `0.0.0.0:${process.env.PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.log(err, "error happened grpc message service");
                return;
            }
            console.log("grpc message server started on port:", port);
        }
    );
};

server.addService(messageProto.MessageServices.service, {
    CreateChat: chatController.createChats,
    getChatsList: chatController.getChatsList,
    getMessages: mesageController.getMessages,
})
GetMessage();
grpcServer();
