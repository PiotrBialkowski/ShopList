import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons

const ProductItem = ({ product, onToggleBought, onDelete, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)} style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, product.bought && styles.boughtText]}>{product.name}</Text>
        <Text style={styles.details}>Cena: {product.price.toFixed(2)} PLN | Sklep: {product.store}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onToggleBought(product.id)} style={styles.iconButton}>
          <MaterialIcons
            name={product.bought ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={product.bought ? 'green' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(product.id)} style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boughtText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default ProductItem;