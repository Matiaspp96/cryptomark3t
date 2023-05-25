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
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.APIkeypinata, process.env.APISecret);
const create_product_dto_1 = require("./dto/create-product.dto");
const products_service_1 = require("./products.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const ethers_1 = require("ethers");
const tokenAddress = "0xC7932824AdF77761CaB1988e6B886eEe90D35666";
const factoryAddress = "0xeb458FE906AECa51eF2122eddE7Fc0E48B7FC37a";
const EscrowFactory_1 = require("./EscrowFactory");
const EscrowFactory_2 = require("./EscrowFactory");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll() {
        return await this.productsService.findAll();
    }
    async createProduct(file, body) {
        const createProductDto = body;
        const { PUBLIC_KEY_SELLER, PUBLIC_KEY_MARKETPLACE, API_KEY_ALCHEMY } = process.env;
        const pinFileToIPFS = async (file) => {
            const readableStreamForFile = fs.createReadStream(process.cwd() + "/uploads" + "/1.jpg");
            const options = {
                pinataMetadata: {
                    name: "product",
                },
                pinataOptions: {
                    cidVersion: 0,
                },
            };
            try {
                const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
                console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
                return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        };
        let imageUrl = await pinFileToIPFS(file);
        body.imageUrl = imageUrl;
        async function createEscrow(imageUrl) {
            const signer = new ethers_1.Wallet(process.env.PRIVATE_KEY_MARKETPLACE);
            const provider = new ethers_1.ethers.providers.AlchemyProvider(80001, process.env.API_KEY_ALCHEMY);
            const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY_MARKETPLACE, provider);
            const factory = new ethers_1.ethers.Contract(factoryAddress, EscrowFactory_1.abi, signer);
            console.log(factory);
            let i = -1;
            const interval = setInterval(async () => {
                i++;
                if (i >= EscrowFactory_2.products.length) {
                    clearInterval(interval);
                    return;
                }
                const array = "0x626166796265696479703574633676666a73697337727a696f6b346f366a3663";
                const escrow = await factory
                    .connect(wallet)
                    .createEscrow(EscrowFactory_2.products[i].seller, ethers_1.utils.parseEther(EscrowFactory_2.products[i].price.toString()), tokenAddress, {
                    id: 1,
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    seller: body.seller,
                    isSold: EscrowFactory_2.products[i].isSold,
                    ipfsHash: array,
                    category: body.category,
                    image: imageUrl,
                });
                console.log(escrow);
            }, 2000);
        }
        createEscrow(imageUrl);
        return await this.productsService.createProduct(body);
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map