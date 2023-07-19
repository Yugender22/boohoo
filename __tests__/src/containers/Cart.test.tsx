/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Cart } from '../../../src/containers';
import { renderWithProvider } from '../../Utils';
import { fireEvent } from '@testing-library/react-native';
import { CartTestIDs, ProductsTestIDs, QuantityTestIDs, TestIDs } from '../../../src/constants/TestIDs';
import { Products } from '../mockData/Products';
import { NavRoutes } from '../../../src/navigation/NavRoutes';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Cart component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })
  it('show empty cart when there are no items added', async() => {
		const { getByTestId } = renderWithProvider(<Cart />, { preloadedState: {
			cart: {
				data: undefined,
				isLoading: false,
				error: undefined,
			}
		}})
		
		expect(getByTestId(CartTestIDs.EmptyCartTestId)).toBeDefined();
	});

  it('should navigate to product details on tapping cart item', async() => {
		const { getByTestId, queryByTestId } = renderWithProvider(<Cart />, { preloadedState: {
			cart: {
				data: [{
					product: Products[0],
					quantity: 1,
				}],
				isLoading: false,
				error: undefined,
			}
		}})
		
		expect(queryByTestId(CartTestIDs.EmptyCartTestId)).toBeNull();
    fireEvent.press(getByTestId(CartTestIDs.CartRowTestId))
    expect(mockNavigate).toBeCalledWith(NavRoutes.ProductDetails, { product: Products[0] })
	});

  
  it('should increase the quantity when + button is clicked', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<Cart />, { preloadedState: {
			cart: {
				data: [{
					product: Products[0],
					quantity: 1,
				}],
				isLoading: false,
				error: undefined,
			}
		}})
		
    fireEvent.press(getByTestId(QuantityTestIDs.IncreaseTestId))
    expect(getByTestId(QuantityTestIDs.QuantityValueTestId).children).toEqual(["2"])
  });

  it('should decrease the quantity when - button is clicked', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<Cart />, { preloadedState: {
			cart: {
				data: [{
					product: Products[0],
					quantity: 2,
				}],
				isLoading: false,
				error: undefined,
			}
		}})
		
    fireEvent.press(getByTestId(QuantityTestIDs.DecreaseTestId))
    expect(getByTestId(QuantityTestIDs.QuantityValueTestId).children).toEqual(["1"])
  });
})
