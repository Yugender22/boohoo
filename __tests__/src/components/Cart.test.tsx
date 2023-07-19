/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Cart } from '../../../src/components';
import { fireEvent, render } from '@testing-library/react-native';
import { CartTestIDs } from '../../../src/constants/TestIDs';

const mockOnPress = jest.fn();

describe('Products component', () => {
	it('should call on press when tapped', async() => {
		const { getByTestId } = render(<Cart quantity={0} onPress={mockOnPress} />, )
		fireEvent.press(getByTestId(CartTestIDs.CartTestId))
        expect(mockOnPress).toBeCalled()
	});

    it('should call on press when tapped', async() => {
		const { getByTestId } = render(<Cart quantity={1} onPress={mockOnPress} />, )
		
		expect(getByTestId(CartTestIDs.CartTestId)).toBeDefined()
	});
})
