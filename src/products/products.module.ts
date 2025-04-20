import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { PRODUCT_SERVICE } from 'src/config/services';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports:[
    ClientsModule.register([
      { name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options:{
          host: envs.producMsHost,
          port: envs.productMsPort
        }
      },
    ]),
  ]
})
export class ProductsModule {}
