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
const factoryAddress = "0x5B372b2e4Db71DD40B41a008A9C0FE7d8CCC8f8D";//"0xeb458FE906AECa51eF2122eddE7Fc0E48B7FC37a";
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
//  const fileP = process.cwd() + file.path
//  console.log(fs.createReadStream(process.cwd() + "/uploads" + "/1.jpg")) ;
 
  const pinFileToIPFS = async (file: Express.Multer.File) => {
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

  async function createEscrow(imageUrl) {

   
const signer = new Wallet(process.env.PRIVATE_KEY_MARKETPLACE);
    const provider = new ethers.providers.AlchemyProvider(80001, process.env.API_KEY_ALCHEMY)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_MARKETPLACE,  provider);
    const factory =  new ethers.Contract(factoryAddress, abi, signer);
    console.log(factory)
   

    // const escrow = await factory.createEscrow(
    //   PUBLIC_KEY_SELLER,
    //   utils.parseEther("100"),
    //   tokenAddress,
    //   products
    // );
    // console.log(escrow);
   
  
    let i = -1;
    const interval = setInterval(async () => {
      i++;
      if (i >= products.length) {
        clearInterval(interval);
        return;
      }
  const array =  
  ["mmm", "dvcwe"]
    
      const escrow = await factory
        .connect(wallet)
        .createEscrow(
          products[i].seller,
          utils.parseEther(products[i].price.toString()),
          tokenAddress,
          {
            id: 1,
            name: body.name,
            description: body.description,
            price: body.price,
            seller: body.seller,
            isSold: products[i].isSold,
            ipfsHash: array,
            category: body.category,
            image: imageUrl,
          } 
        ); 
      // console.log(escrow);
     }, 2000); 
  }
  // .catch(){}
  
  createEscrow(imageUrl)
  return await this.productsService.createProduct(body);
}
}
