import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.APIkeypinata, process.env.APISecret);
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./product.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import path from "path";
import { ethers, Wallet, utils, providers } from "ethers";
const tokenAddress = "0xC7932824AdF77761CaB1988e6B886eEe90D35666";
const factoryAddress = "0xeb458FE906AECa51eF2122eddE7Fc0E48B7FC37a";
import  {abi} from "./EscrowFactory"
import { products } from "./EscrowFactory";




@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
  @Post()
@UseInterceptors(FileInterceptor("file"))
async createProduct(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: CreateProductDto
): Promise<Product> {
  const createProductDto: CreateProductDto = body;
  const { PUBLIC_KEY_SELLER, PUBLIC_KEY_MARKETPLACE, API_KEY_ALCHEMY } =
  process.env;
 
 
  const pinFileToIPFS = async (file: Express.Multer.File) => {
    const readableStreamForFile = fs.createReadStream(file.path);
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
      console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  let imageUrl = await pinFileToIPFS(file);

  body.imageUrl = imageUrl;
  // console.log(body)

  async function createEscrow() {

    const provider = new ethers.providers.AlchemyProvider(80001, process.env.API_KEY_ALCHEMY)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_MARKETPLACE,  provider);
    const Factory = await ethers.Contract("EscrowFactory");
    console.log(Factory)
    const factory = await Factory.attach(factoryAddress);
    // const signer = new Wallet(process.env.PRIVATE_KEY_MARKETPLACE);
    // constractFactory = new ethers.Contract(contractAddress, abi, wallet)
    ethers.ContractFactory()


    const escrow = await factory.createEscrow(
      PUBLIC_KEY_SELLER,
      utils.parseEther("100"),
      tokenAddress,
      products
    );
    console.log(escrow);
   
  
    let i = -1;
    const interval = setInterval(async () => {
      i++;
      if (i >= products.length) {
        clearInterval(interval);
        return;
      }
  
      const escrow = await factory
        .connect(wallet)
        .createEscrow(
          products[i].seller,
          utils.parseEther(products[i].price.toString()),
          tokenAddress,
          {
            id: products[i].id,
            name: products[i].name,
            description: products[i].description,
            price: products[i].price,
            seller: products[i].seller,
            isSold: products[i].isSold,
            ipfsHash: imageUrl,
            category: products[i].category,
            image: products[i].thumbnail,
          }
        );
      console.log(escrow);
    }, 2000);
  }

  // createEscrow()
  return await this.productsService.createProduct(body);
}
}
