import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from './schema/file.schema';
import { Model } from 'mongoose';
import { CreateFileDto, UpdateFileDto } from './dto/file-dto';

@Injectable()
export class FilesService {
    constructor(
        @InjectModel('files')
        private readonly filesModel: Model<File>
    ){}

    async createFile(createFileDto: CreateFileDto): Promise<File>{
        const file = new this.filesModel(createFileDto);
        await file.save();
        return file;
    }

    async getFileById(id: string): Promise<File>{
        return this.filesModel.findById(id);
    }

    async updateFile(id: string, updateFileDto: UpdateFileDto): Promise<File>{
        return this.filesModel.findByIdAndUpdate(
            id,
            {content: updateFileDto.content, modifiedAt: Date.now()},
            {new: true}
        )
    }

    async deleteFile(id: string): Promise<File>{
        return this.filesModel.findByIdAndDelete(id);
    }

    async deleteManyFiles(ids: string[]) {
        await this.filesModel.deleteMany(
            {
                _id: {$in: ids}
            }
        )
    }
}
