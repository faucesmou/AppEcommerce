import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import type { TesloProduct } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsBypage = async (page: number, limit: number = 20): Promise<Product[]>  => {

//console.log({page, limit});

    try {

        const { data } = await tesloApi.get<TesloProduct[]>(`products?offset=${ page * 10}&limit=${ limit }`);

    const products = data.map( ProductMapper.tesloProductToEntity) 
    console.log('El producto es: ', products[4]);
    

    return products;      

    } catch (error) {
        console.log(error);
        throw new Error('Error getting products');
        

    }


} 

/* Aclaracion: cuando tenemos una funcion que recibe los mismos del que los estamos llamando como en este caso: const products = data.map( tesloProduct => ProductMapper.tesloProductToEntity( tesloProduct)) podemos simplemente mandar como referencia la funcion sola. asi: const products = data.map( ProductMapper.tesloProductToEntity ) y va a funcionar exactamente igual.  */