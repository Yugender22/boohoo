import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { TestIDs } from '../constants/TestIDs';

interface LoaderProps {
  animating: boolean
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  return (
    <View style={styles.container} testID={TestIDs.LoaderTestId}>
      <ActivityIndicator animating={props.animating} size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  }
})