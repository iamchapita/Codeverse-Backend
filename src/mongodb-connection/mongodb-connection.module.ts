import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
//import { dotenv } from "dotenv";


//const url: string = process.env.ATLAS; 
const url: string='mongodb://0.0.0.0:27017/codeverse'

@Module({
    imports: [
        MongooseModule.forRoot(url),
    ]
})
export class MongodbConnectionModule {}
