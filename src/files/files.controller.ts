import { Controller, Get, Post, Put, Delete, Body, Param, } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto } from './dto/file-dto';
import { FilesService } from './files.service';
import { File } from "./schema/file.schema";

@Controller('files')
export class FilesController {

    constructor(
        private filesService: FilesService
    ){}

    @Post()
    create(@Body() createFileDto: CreateFileDto): Promise<File>{
        return this.filesService.createFile(createFileDto);
    }

    @Get('/:id')
    getById(@Param('id') id: string): Promise<File>{
        return this.filesService.getFileById(id);
    }

    @Put('/:id')
    updateById(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto): Promise<File>{
        return this.filesService.updateFile(id, updateFileDto);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string): Promise<File>{
        return this.filesService.deleteFile(id);
    }

}
