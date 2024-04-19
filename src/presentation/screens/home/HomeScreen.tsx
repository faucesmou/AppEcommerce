import { ViewStyle } from 'react-native';
import { useInfiniteQuery, } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';

import { getProductsBypage } from '../../../actions/products/get-products-by-page';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FullScreenLoader } from '../../components/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';

import { FAB } from '../../components/ui/FAB';
import { RootStackParams } from '../../navigation/StackNavigator';


export const HomeScreen = ()=> {
  const marginTopStyle: ViewStyle = { marginTop: 90 };
 
/*   const { logout } = useAuthStore(); */

const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { isLoading, data, fetchNextPage  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1hour
    initialPageParam: 0,

    queryFn: async (params)=> {
     
      const products = await getProductsBypage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  }); 

//  getProductsBypage(0);

    return (
      <>
      
      
      
      <MainLayout 
      title="TesloShop - Products"
      subTitle="Aplicación Administrativa"> 
      {
        isLoading ? (<FullScreenLoader/>)
        : <ProductList 
        products={ data?.pages.flat() ?? []}
        fetchNextPage={ fetchNextPage } 
        />
      }
      </MainLayout>

      <FAB
      iconName="save-outline"
      onPress={()=> navigation.navigate('ProductScreen', { productId: 'new' })}
      style={{
        position: 'absolute',
        bottom:30,
        right:20,
      }}
      />
      </>
    )
    
  }



  
  {/*  <Icon name="facebook" /> */}

 {/*   <Button
   accessoryLeft={  <Icon name="log-out-outline" />}
   onPress={ logout }
   >
     Cerrar sesión
   </Button> */}