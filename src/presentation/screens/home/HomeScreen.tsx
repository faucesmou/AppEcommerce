import { Layout, Text, Button, Icon } from '@ui-kitten/components'
import { ViewStyle } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsBypage } from '../../../actions/products/get-products-by-page';


export const HomeScreen = ()=> {
  const marginTopStyle: ViewStyle = { marginTop: 90 };
 
  const { logout } = useAuthStore();

  getProductsBypage(0);

    return (
      <Layout 
     /*  style={marginTopStyle} */
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}

      >
        <Text>HomeScreen</Text>
       {/*  <Icon name="facebook" /> */}

        <Button
        accessoryLeft={  <Icon name="log-out-outline" />}
        onPress={ logout }
        >
          Cerrar sesión
        </Button>
   
      </Layout>
    )
  
}