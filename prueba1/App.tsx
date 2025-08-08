import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import JuegoProvider from './Provider/juegoProvider';
import JuegoComponent from './Componentes/juegoComponen';
import PartidasComponent from './Componentes/partidasComponen';

export default function App() {
  return (
    <View style={styles.container}>
      <JuegoComponent/>
      <PartidasComponent/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
