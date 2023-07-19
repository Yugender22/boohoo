import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface LoaderProps {
  animating: boolean
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  return (
    <View style={styles.container}>
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