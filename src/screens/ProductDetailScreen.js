import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params; // Get product data from navigation params [cite: 31]

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Błąd: Nie można załadować szczegółów produktu. [cite: 32]</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.detail}>Cena: {product.price.toFixed(2)} PLN</Text>
      <Text style={styles.detail}>Sklep: {product.store}</Text>
      {product.description && <Text style={styles.detail}>Opis: {product.description}</Text>}
      {/* You can add an image here if your product data includes an image URL */}
      {/* <Image source={{ uri: product.imageUrl }} style={styles.productImage} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 15,
    borderRadius: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ProductDetailScreen;