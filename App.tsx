import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect } from 'react';
import { createTable } from './src/services/database';

export default function App() {

  useEffect(() => {
    const initDB = async () => {
      try {
        await createTable();
        console.log("Table created or already exists ✅");
      } catch (err) {
        console.error("Failed to create table ❌", err);
      }
    };
  
    initDB();
  }, []);
  
  return (
    <View style={styles.container}>
      <HomeScreen />
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
