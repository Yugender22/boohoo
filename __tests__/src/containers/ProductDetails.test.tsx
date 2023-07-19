/**
 * @format
 */

import 'react-native';
import React from 'react';
import { ProductDetails } from '../../../src/containers';
import { renderWithProvider } from '../../Utils';
import { fireEvent } from '@testing-library/react-native';
import { ProductsTestIDs, QuantityTestIDs } from '../../../src/constants/TestIDs';

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({
      params: {
        product: { "colour": "Black", "id": 3, "img": "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024", "name": "Black Frill Tie Shoulder Bodycon Dress", "price": 7.99 }
      },
    }),
  };
});

describe('Product Details component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })
  it('should hide add to cart button once it is clicked', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProductDetails />)
    fireEvent.press(getByTestId(ProductsTestIDs.AddToCartTestId))
    expect(queryByTestId(ProductsTestIDs.AddToCartTestId)).toBeNull()
    expect(getByTestId(QuantityTestIDs.QuantityTestId)).toBeDefined()
  });

  it('should increase the quantity when + button is clicked', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProductDetails />)
    fireEvent.press(getByTestId(ProductsTestIDs.AddToCartTestId))
    expect(queryByTestId(ProductsTestIDs.AddToCartTestId)).toBeNull()
    fireEvent.press(getByTestId(QuantityTestIDs.IncreaseTestId))
    expect(getByTestId(QuantityTestIDs.QuantityValueTestId).children).toEqual(["2"])
  });

  it('should decrease the quantity when - button is clicked', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProductDetails />)
    fireEvent.press(getByTestId(ProductsTestIDs.AddToCartTestId))
    expect(queryByTestId(ProductsTestIDs.AddToCartTestId)).toBeNull()
    fireEvent.press(getByTestId(QuantityTestIDs.DecreaseTestId))
    expect(getByTestId(ProductsTestIDs.AddToCartTestId)).toBeDefined()
  });
})
