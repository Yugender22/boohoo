import { FC, useEffect } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Loader, Product } from "../components";
import { getProducts } from "../redux/service/getProducts";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ProductType } from "../types";
import { NavRoutes } from "../navigation/NavRoutes";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


interface ProductsProps {
}

export const Products: FC<ProductsProps> = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products)

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    console.log('Products launch')
    const fetchProducts = async () => {
      const resultAction = await dispatch(getProducts())
    }
    fetchProducts().catch(error => console.log(error))
  }, [])

  const renderProducts = () => {

    return products?.data ? (
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={products.data}
        renderItem={(data: ListRenderItemInfo<ProductType>) => {
          return (
            <Product
              product={data.item}
              onPress={(product) => {
                navigation.navigate(NavRoutes.ProductDetails, {product})
              }} />
          )
        }}
        numColumns={2}
      />
    )
      : <></>
  }

  return (
    <View style={styles.container}>
      {products.isLoading ?
        <Loader animating />
        :
        renderProducts()
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})