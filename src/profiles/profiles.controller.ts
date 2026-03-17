import { Controller, Get, Param, Post, Body, Put, HttpCode, HttpStatus, Delete, NotFoundException, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from 'src/profiles.guard';
import type { UUID } from "crypto";

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
    findOne(@Param("id", ParseUUIDPipe) id: UUID) {
        try {
            return this.profilesService.findOne(id);
        }
        catch(error){
            throw new NotFoundException(error.message);
        }
    }

    // Post /profiles
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    // Update /profiles/id
    @Put(':id')
    update(
        @Param("id", ParseUUIDPipe) id: UUID,
        @Body() updateProfileDto: UpdateProfileDto) {
            return this.profilesService.update(id, updateProfileDto);
    }

    // Delete /profiles/:id
    @Delete(":id")
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseUUIDPipe)  id: UUID) {
        return this.profilesService.delete(id);
    }
}
