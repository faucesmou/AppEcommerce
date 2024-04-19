import { useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { Layout, List } from "@ui-kitten/components"
import { useQueryClient } from "@tanstack/react-query";

import { Product } from "../../../domain/entities/product";
import { ProductCard } from "./ProductCard";


interface Props {
    products: Product[];
    fetchNextPage: ()=> void;
    //todo: fetch nextPage

}

export const ProductList = ({products, fetchNextPage}:Props) => {

const queryClient = useQueryClient();
const [isRefreshing, setisRefreshing] = useState(false)

const onPullToRefresh = async() => {
  setisRefreshing(true);
  await new Promise(resolve=> setTimeout(resolve, 200));//esto luego se puede quitar
  queryClient.invalidateQueries({ queryKey: ['products', 'infinite']});

  setisRefreshing(false)

}

    return (
      <List
      data={ products }
      numColumns={2}
      keyExtractor={ (item, index) => `${item.id}-${index}`}
      renderItem={({item})=>(
        <ProductCard product={item}/>
      )}

      ListFooterComponent={ ()=> <Layout style={{ height: 150 }}/>}
      onEndReached={ fetchNextPage}
      onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
          refreshing={ isRefreshing }
          onRefresh={ onPullToRefresh }
          />
        }
      />
    )
  
}