import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { CartRow } from "../components";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { NavRoutes } from "../navigation/NavRoutes";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addItem, removeItem } from "../redux/slices/CartSlice";
import { CartItem } from "../types/CartItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CartTestIDs } from "../constants/TestIDs";

export const Cart: React.FC = () => {

  const cartItems = useAppSelector(state => state.cart)

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const emptyCart = () => {
    return (
      <View style={styles.emptyContainer} testID={CartTestIDs.EmptyCartTestId}>
        <Icon name='cart-off' color={'#cccccc'} size={300} />
      </View>
    )
  }

  const renderProducts = () => {

    return (
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
        ListEmptyComponent={emptyCart}
      />)
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
    backgroundColor: '#FFFFFF',
  },
  itemSeperator: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})