var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ANIMAL_SPECIES_ENUM } from '../types/petType.js';
let PetEntity = class PetEntity {
    id;
    name;
    species;
    dob;
    adopted;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PetEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PetEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PetEntity.prototype, "species", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PetEntity.prototype, "dob", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], PetEntity.prototype, "adopted", void 0);
PetEntity = __decorate([
    Entity()
], PetEntity);
export default PetEntity;
