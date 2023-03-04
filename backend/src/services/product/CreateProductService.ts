import prismaClient from "../../prisma";

interface ProductRequest{
  name: string,
  price: string,
  description: string,
  banner: string;
  category_id: string;
}

export default class CreateProductService {
  async execute({name, price, description, banner, category_id}: ProductRequest){
    return {'product created with sucess': true};
    
    // const product = prismaClient.product.create {}
  }
}