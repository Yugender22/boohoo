import { FC, useEffect } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { CartRow } from "../components";
import { getProducts } from "../redux/service/getProducts";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ProductType } from "../types";
import { NavRoutes } from "../navigation/NavRoutes";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addItem, removeItem } from "../redux/slices/CartSlice";
import { CartItem } from "../types/CartItem";

export const Cart: React.FC = () => {

  const cartItems = useAppSelector(state => state.cart)

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const renderProducts = () => {

    return cartItems?.data ? (
      <FlatList
        keyExtractor={(item) => `${item.product.id}`}
        data={cartItems.data}
        renderItem={(data: ListRenderItemInfo<CartItem>) => {
          return (
            <CartRow
              item={data.item}
              onPress={(product) => {
                navigation.navigate(NavRoutes.ProductDetails, { product })
              }}
              increase={() => dispatch(addItem(data.item))}
              decrease={() => dispatch(removeItem(data.item))}
            />
          )
        }}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      />
    )
      : <></>
  }

  return (
    <View style={styles.container}>
      {renderProducts()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  itemSeperator: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC'
  }
})