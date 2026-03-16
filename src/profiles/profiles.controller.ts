import { Controller, Get, Query, Param, Post, Body, Put, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService : ProfilesService) {}
    // Get /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // Get /profiles/:id
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.profilesService.findOne(id);
    }

    // Post /profiles
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    // Update /profiles/id
    @Put(':id')
    update(
        @Param("id") id: string,
        @Body() updateProfileDto: UpdateProfileDto) {
            return this.profilesService.update(id, updateProfileDto);
    }

    // Delete /profiles/:id
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id")  id: string) {
        this.profilesService.delete(id)
        return "Successfully deleted!"
    }
}
