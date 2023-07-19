import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { NavRoutes } from './NavRoutes';
import { Products, ProductDetails, Menu, Cart as CartScreen } from '../containers';
import { Cart } from '../components';
import { useAppSelector } from '../redux/store';
import { CartItem } from '../types/CartItem';

const Stack = createNativeStackNavigator();

export const Navigation: React.FC = () => {

  const cartItems = useAppSelector(state => state.cart)
  const quantity = React.useMemo(() => {
    return cartItems.data ? cartItems.data.reduce((previousValue: number, currentItem: CartItem) => {
      previousValue += currentItem.quantity
      return previousValue;
    }, 0)
      : 0
  }, [cartItems])

  const onCartPress = (navigation: any) => {
    navigation.navigate(NavRoutes.Cart)
  }

  const headerRight = (navigation: any) => () => (<Cart quantity={quantity} onPress={() => onCartPress(navigation)} />)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavRoutes.Products}>
        <Stack.Screen
          name={NavRoutes.Products}
          component={Products}
          options={({ navigation }) => ({
            headerRight: headerRight(navigation)
          })}
        />
        <Stack.Screen
          name={NavRoutes.ProductDetails}
          component={ProductDetails}
          options={({ navigation }) => ({
            headerRight: headerRight(navigation)
          })}
        />

        <Stack.Screen name={NavRoutes.Menu} component={Menu} />
        <Stack.Screen name={NavRoutes.Cart} component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
