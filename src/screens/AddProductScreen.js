import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onAddProduct } = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [description, setDescription] = useState('');

  const handleAddProduct = () => {
    if (!name || !price || !store) {
      Alert.alert('Błąd', 'Nazwa, cena i sklep są wymagane!');
      return;
    }
    const newProduct = {
      name,
      price: parseFloat(price),
      store,
      description,
    };
    onAddProduct(newProduct);
    Alert.alert('Sukces', 'Produkt dodany!');
    navigation.goBack(); // Go back to the previous screen [cite: 26]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nazwa Produktu:</Text>
      <TextInput
        style={styles.input}
        placeholder="Np. Chleb"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Cena:</Text>
      <TextInput
        style={styles.input}
        placeholder="Np. 4.99"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sklep:</Text>
      <TextInput
        style={styles.input}
        placeholder="Np. Biedronka"
        value={store}
        onChangeText={setStore}
      />

      <Text style={styles.label}>Opis (opcjonalnie):</Text>
      <TextInput
        style={styles.input}
        placeholder="Dodatkowy opis produktu"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Button title="Dodaj Produkt" onPress={handleAddProduct} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default AddProductScreen;