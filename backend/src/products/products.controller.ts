import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors, UploadedFile
  } from '@nestjs/common';
  require('dotenv').config();
  const pinataSDK = require('@pinata/sdk');
  const pinata = new pinataSDK(process.env.APIkeypinata, process.env.APISecret);
  import { CreateProductDto } from './dto/create-product.dto';
  import { ProductsService } from './products.service';
  import { Product } from './product.entity';
  import { FileInterceptor } from '@nestjs/platform-express';
  import * as fs from 'fs';
import path from 'path';



  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(
      @UploadedFile() file: Express.Multer.File,
      @Body() body: CreateProductDto
    ): Promise<Product> {
        // console.log(file)
        const createProductDto: CreateProductDto = body

        async function pinataMetaData(file) {
          const readableStreamForFile = fs.createReadStream(
            file.path
           
          );
     console.log(readableStreamForFile)
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
                // console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
                return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
              })
              .catch((err) => {
                console.log(err);
              });
          };
    
          async function getMetadata() {
            const imageUrl = await pinFileToIPFS();
            const imageUrlPinata = imageUrl;
    console.log(imageUrl)
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
pinataMetaData(file)

      return await this.productsService.createProduct(createProductDto);
    }
  }
  