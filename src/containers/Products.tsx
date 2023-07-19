import { FC, useEffect } from "react";
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Loader, Product } from "../components";
import { getProducts } from "../redux/service/getProducts";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ProductType } from "../types";
import { NavRoutes } from "../navigation/NavRoutes";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Products: FC = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products)

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts())
    }

    if (!products.data || products.data.length === 0) {
      fetchProducts().catch(error => { 
        Alert.alert('Error', 'Something went wrong! Please try again later.', [{
          text: 'Ok',
        }])
      })
    }
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
                navigation.navigate(NavRoutes.ProductDetails, { product })
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