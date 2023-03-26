import { Controller, Delete, HttpCode, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DeleteRoleUserDto } from './dto/DeleteRoleUserDto';
import { RoleuserService } from './roleuser.service';

@Controller('roleuser')
export class RoleuserController {

    constructor(private readonly roleuserService: RoleuserService) { }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteRoleUserDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteRoleUserDto> {
        return await this.roleuserService.delete(id);
    }

}