var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";
let AdopterEntity = class AdopterEntity {
    id;
    name;
    password;
    mobile;
    picture;
    address;
    constructor(name, password, mobile, picture, address) {
        this.name = name;
        this.password = password;
        this.picture = picture;
        this.mobile = mobile;
        this.address = address;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdopterEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AdopterEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AdopterEntity.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AdopterEntity.prototype, "mobile", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AdopterEntity.prototype, "picture", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AdopterEntity.prototype, "address", void 0);
AdopterEntity = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], AdopterEntity);
export default AdopterEntity;
