import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ServiceData } from './DataService';

@Controller('basePoint')
export class DataController {

    constructor(private readonly serviceData: ServiceData) { }

    @Get()
    @ApiOkResponse()
    async createBaseData() {
        return this.serviceData.lunchStart();
    }
}