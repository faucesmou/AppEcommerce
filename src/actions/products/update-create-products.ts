import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product"


export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') {
        return updateProduct(product);
    }
    return createProduct( product );

    //throw new Error('creación no está implementada')

}

const prepareImages = (images: string[]) => {
    //todo: revisar los FILES
    return images.map(
        image => image.split('/').pop()
    )
}
// TODO: REVISAR SI VIENE EL USUARIO
const updateProduct = async (product: Partial<Product>) => {

    const { id, images = [], ...rest } = product;

    try {
        const checkedImages = prepareImages(images);
      

        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.log('Axios error: ', error.response?.data);
        }
        throw new Error("Error al actualizar el producto");
    }
}

const createProduct = async( product: Partial<Product>) => {

    const { id, images = [], ...rest } = product;

    try {
        const checkedImages = prepareImages(images);
     

        const { data } = await tesloApi.post(`/products/`, {
            images: checkedImages,
            ...rest
        })

        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.log('Axios error: ', error.response?.data);
        }
        throw new Error("Error al crear el producto");
    }

}

