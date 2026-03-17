import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: "Name #1",
            description: "Description #1"
        },
        {
            id: randomUUID(),
            name: "Name #2 blee blee blee",
            description: "Description #2 (delete this to check if PUT api works)"
        },
        {
            id: randomUUID(),
            name: "Name #3",
            description: "Description #3"
        },
    ];

    findAll() {
        return this.profiles;
    }

    findOne(id: string) {
        const matchingProfile = this.profiles.find(
            (existingProfile) => existingProfile.id === id
        );
        
        if (!matchingProfile) {
            throw new NotFoundException();
        };

        return this.profiles.find((profile) => profile.id === id)
    }

    create(createProfileDto: CreateProfileDto) {
        const createdProfile = {
            id: randomUUID(),
            ...createProfileDto
        };
        this.profiles.push(createdProfile);
        return createProfileDto
    }

    update(id: string, updateProfileDto : UpdateProfileDto) {
        const matchingProfile = this.profiles.find(
            (existingProfile) => existingProfile.id === id
        );
        
        if (!matchingProfile) {
            throw new NotFoundException(`Profile with ${ id } not found.`);
        };

        matchingProfile.name = updateProfileDto.name;
        matchingProfile.description = updateProfileDto.description;
        return matchingProfile;
    }

    delete(id: string) {
        const matchingProfileIndex = this.profiles.findIndex(
            (profile) => profile.id === id
        );

        if (matchingProfileIndex === -1) {
            throw new NotFoundException(`Profile with ${ id } not found.`);
        }
        else {
            this.profiles.splice(matchingProfileIndex, 1);
        };
    }
}
