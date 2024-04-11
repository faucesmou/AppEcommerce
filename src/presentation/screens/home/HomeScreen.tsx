import { Layout, Text, Button, Icon } from '@ui-kitten/components'
import { ViewStyle } from 'react-native';


export const HomeScreen = ()=> {
  const marginTopStyle: ViewStyle = { marginTop: 90 };
 
    return (
      <Layout 
     /*  style={marginTopStyle} */
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}

      >
        <Text>HomeScreen</Text>
       {/*  <Icon name="facebook" /> */}

        <Button
        accessoryLeft={  <Icon name="facebook" />}
        >
          Cerrar sesión
        </Button>
   
      </Layout>
    )
  
}