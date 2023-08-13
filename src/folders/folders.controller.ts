import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto, UpdateFolderDto } from './dto/folder-dto';
import { Folder } from './schema/folder.schema';

@Controller('folders')
export class FoldersController {
    constructor(
        private readonly foldersService: FoldersService
    ){}

    @Post()
    createFolder(@Body() createFolderDto: CreateFolderDto): Promise<Folder>{
        return this.foldersService.createFolder(createFolderDto);
    }

    @Get('/:id')
    getFolderById(@Param('id') id: string): Promise<Folder>{
        return this.foldersService.getFolderById(id);
    }

    @Put('/:id')
    updateFolderById(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto): Promise<Folder>{
        return this.foldersService.updateFolder(id, updateFolderDto);
    }

    @Put('/:folderId/add-project/:projectId')
    addProjectToFolder(
        @Param('folderId') folderId: string, 
        @Param('projectId') projectId: string
    ){
        return this.foldersService.addProject(folderId, projectId);
    }

    @Put('/:folderId/add-folder/:otherFolderId')
    addFolderToFolder(
        @Param('folderId') folderId: string, 
        @Param('otherFolderId') otherFolderId: string
    ){
        return this.foldersService.addFolder(folderId, otherFolderId);
    }

    @Put('/:folderId/add-snippet/:snippetId')
    addSnippetToFolder(
        @Param('folderId') folderId: string,
        @Param('snippetId') snippetId: string
    ){
        return this.foldersService.addSnippet(folderId, snippetId);
    }

    @Delete('/:id')
    deleteFolderById(
        @Param('id') id: string
    ): Promise<Folder>{
        return this.foldersService.deteleFolder(id);
    }
}
