import { useRef } from "react"
import { ButtonGroup, Input, Layout, Button, useTheme  } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"

import { getProductById, updateCreateProduct  } from "../../../actions/products"
import { ScrollView } from "react-native-gesture-handler"

import { Product } from "../../../domain/entities/product"
import { MyIcon } from "../../components/ui/MyIcon"
import { Formik } from "formik"
import { ProductImages } from "../../components/products/ProductImages"
import { genders, sizes } from "../../../config/constants/constants"



/* const sizes: Size[] =[Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl ]
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex
] */

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props) =>  {

  const productIdRef = useRef(route.params.productId);
  const theme = useTheme()
  const queryClient = useQueryClient()

const { data: product } = useQuery({
  queryKey: ['product', productIdRef ],
  queryFn: ()=> getProductById(productIdRef.current),
});

const mutation = useMutation({ 
  mutationFn: ( data: Product ) => updateCreateProduct({...data, id: productIdRef.current}),
  onSuccess( data: Product ){
    productIdRef.current = data.id; // creación con nuevo Id.

    queryClient.invalidateQueries({ queryKey: ['products', 'infinite']});
    queryClient.invalidateQueries({ queryKey: ['product', data.id ]});
    //queryClient.setQueryData( ['product', data.id ], data );
    console.log('Success');
    console.log({data});
  },
})

if (!product){
  return (<MainLayout title="Cargando..."/>)
}
  //useQuery
  //useMutation

  
  
    return (
      <Formik
      initialValues={product}
      onSubmit={ values => mutation.mutate(values)}/* esto se puede poner tambien asi: mutation.mutate, porque el value es lo mismo que le pasamos a la funcion. */    
      >
        {
          ({ handleChange, handleSubmit, values, errors, setFieldValue })=> (
      <MainLayout
      title={ values.title }
      subTitle={`Precio: ${ values.price }`}
      >
        <ScrollView style={{ flex: 1 }}>

          {/* imagenes de el producto */}
          <Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems:'center'}} >
            
            <ProductImages images={values.images} />

          </Layout>

          {/* formulario */}
          <Layout style={{ marginHorizontal: 10 }}>
            <Input
            label="Titulo"
            style={{ marginVertical:5}}
            value={ values.title }
            onChangeText={ handleChange('title') }
            />
            <Input
            label="Slug"
            value={ values.slug}
            onChangeText={ handleChange('slug') }
            style={{ marginVertical:5}}
            />
            <Input
            label="Descripcion"
            value={ values.description}
            onChangeText={ handleChange('description') }
            multiline
            numberOfLines={5}
            style={{ marginVertical:5}}
            />
          </Layout >

              {/* Precio e inventario  */}
          <Layout 
          style={{ 
            marginVertical:5, 
            marginHorizontal: 15, 
            flexDirection: 'row', 
            gap:10 }} 
          >
          <Input
            label="Precio"
            value={ values.price.toString()}
            onChangeText={ handleChange('price') }
            style={{ flex:1 }}
            keyboardType="numeric"
            />
          <Input
            label="Inventario"
            value={ values.stock.toString()}
            onChangeText={ handleChange('stock') }
            style={{ flex:1 }}
            keyboardType="numeric"
            />
          </Layout>

          {/* Selectores */}

          <ButtonGroup 
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15}}
          size="small"
          appearance="outline"
          >
            {
              sizes.map((size)=> (
                <Button 
                onPress={ ()=> setFieldValue(
                  'sizes', values.sizes.includes(size)
                 ? values.sizes.filter( s=> size !== size) 
                 : [...values.sizes, size ]  )}
                key={size}
                style={{ 
                  flex:1,
                  backgroundColor: values.sizes.includes(size)
                  ? theme[ 'color-primary-300']
                  : undefined 
                 }}
                >{size}</Button>
              ))
            }
          </ButtonGroup>

          {/* genero */}

          <ButtonGroup 
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15}}
          size="small"
          appearance="outline"
          >
          
            {
              genders.map((gender)=> (
                <Button 
                onPress={ ()=> setFieldValue('gender', gender)}
                key={gender}
                style={{ 
                  flex:1,
                  backgroundColor: values.gender.startsWith(gender) ? theme[ 'color-primary-300'] : undefined 
                 }}
                >{gender}</Button>
              ))
            }
          </ButtonGroup>

          {/* botón de guardar */}
          <Button
          accessoryLeft={ <MyIcon name= "save-outline" white/>}
          onPress={ ()=> handleSubmit()}
          disabled={ mutation.isPending}
          style={{ margin:15 }}
          >
            Guardar 
          </Button>

         {/*  <Text> { JSON.stringify(values, null, 2) } </Text> */}


          <Layout style={{ height: 200}} />

        </ScrollView>
  
      </MainLayout>
  
          )
        }

     

      </Formik>
    )
  
}