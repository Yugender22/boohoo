/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Products } from '../../../src/containers';
import { renderWithProvider } from '../../Utils';
import { Products as ProductsData } from '../mockData/Products';
import { fireEvent } from '@testing-library/react-native';
import { ProductsTestIDs, TestIDs } from '../../../src/constants/TestIDs';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Products component', () => {
	
	it('show loading when products is empty', async() => {
		const { getByTestId } = renderWithProvider(<Products />, { preloadedState: {
			products: {
				data: undefined,
				isLoading: false,
				error: undefined,
			}
		}})
		
		expect(getByTestId(TestIDs.LoaderTestId)).toBeDefined();
	});

	it('tapping on a product should navigate to product details', async() => {
		const { getByTestId } = renderWithProvider(<Products />, { preloadedState: {
			products: {
				state: {
					product: ProductsData[0],
					quantity: 1,
				},
				data: ProductsData,
				isLoading: false,
				error: undefined,
			}
		}})
		
		fireEvent.press(getByTestId(`${ProductsTestIDs.ProductItemTestId}-${ProductsData[0].id}`))
		expect(mockNavigate).toBeCalled();
	});
})
