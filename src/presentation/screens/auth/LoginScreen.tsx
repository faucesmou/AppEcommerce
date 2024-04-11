import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";




export const LoginScreen = () => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1"
          style={{ marginBottom: 20 }}
          > Ingresar </Text>
          <Text category="p2"> Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={ <MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={ <MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Espacio */}

        <Layout style={{ height: 10 }} />

        {/* Button */}

        <Layout style={{ marginTop: 20 }}>
          <Button
          accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            onPress={() => { }}
          >
            Ingresar
          </Button>

        </Layout>

        {/* informacion para crear cuenta */}
        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection:'row',
          justifyContent:'center'
        }}>
          <Text>
            ¿no tienes cuenta?
          </Text>
          <Text status="primary"
           category="s1"
           onPress={()=> {}}
           >
            {' '}
            Crear cuenta{' '}
          </Text>
        </Layout>

      </ScrollView>

    </Layout>
  )

}

