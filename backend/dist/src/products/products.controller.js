"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.APIkeypinata, process.env.APISecret);
const create_product_dto_1 = require("./dto/create-product.dto");
const products_service_1 = require("./products.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll() {
        return await this.productsService.findAll();
    }
    async createProduct(file, body) {
        const createProductDto = body;
        async function pinataMetaData(file) {
            const readableStreamForFile = fs.createReadStream(file.path);
            console.log(readableStreamForFile);
            const options = {
                pinataMetadata: {
                    name: 'product',
                },
                pinataOptions: {
                    cidVersion: 0,
                },
            };
            const pinFileToIPFS = () => {
                return pinata
                    .pinFileToIPFS(readableStreamForFile, options)
                    .then((result) => {
                    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
                })
                    .catch((err) => {
                    console.log(err);
                });
            };
            async function getMetadata() {
                const imageUrl = await pinFileToIPFS();
                const imageUrlPinata = imageUrl;
                console.log(imageUrl);
                const body = {
                    name: "",
                    description: "",
                    image: imageUrl,
                };
                return pinata
                    .pinJSONToIPFS(body, options)
                    .then((result) => {
                    return {
                        metadataUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
                        imageUrl: imageUrlPinata,
                    };
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            return getMetadata();
        }
        pinataMetaData(file);
        return await this.productsService.createProduct(createProductDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map