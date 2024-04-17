import { Text, Icon } from '@ui-kitten/components'
import { ViewStyle } from 'react-native';
//import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsBypage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';


export const HomeScreen = ()=> {
  const marginTopStyle: ViewStyle = { marginTop: 90 };
 
/*   const { logout } = useAuthStore(); */

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1hour
    queryFn: ()=> getProductsBypage(0),
  }) 

//  getProductsBypage(0);

    return (
      <MainLayout 
      title="TesloShop - Products"
      subTitle="Aplicación Administrativa"
      //rightAction={ ()=> {}}
      //rightActionIcon='plus-outline'
      > 

      {
        isLoading ? (<FullScreenLoader/>)
        : <ProductList products={products}/>
      }
      
  
   
      </MainLayout>
    )
    
  }



  
  {/*  <Icon name="facebook" /> */}

 {/*   <Button
   accessoryLeft={  <Icon name="log-out-outline" />}
   onPress={ logout }
   >
     Cerrar sesión
   </Button> */}