import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';

const initialProducts = [
  { id: '1', name: 'Mleko', price: 3.50, store: 'Biedronka', bought: false, description: 'Świeże mleko 2%' },
  { id: '2', name: 'Chleb', price: 4.00, store: 'Piekarnia', bought: false, description: 'Chleb razowy' },
  { id: '3', name: 'Jajka', price: 8.99, store: 'Lidl', bought: false, description: 'Jajka ściółkowe, 10 sztuk' },
  { id: '4', name: 'Kawa', price: 15.99, store: 'Biedronka', bought: true, description: 'Kawa ziarnista' },
  { id: '5', name: 'Cukier', price: 3.00, store: 'Lidl', bought: false, description: 'Cukier biały' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(initialProducts);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState(null); // 'price' or 'store'

  // Use useFocusEffect to refresh data when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // This is where you would fetch data from a server or local DB [cite: 28]
      // For now, we'll just re-sort and re-filter
      applyFiltersAndSorting();
    }, [products, searchText, filterType])
  );

  const applyFiltersAndSorting = () => {
    let filtered = [...products];

    // Apply filtering [cite: 10]
    if (searchText) {
      filtered = filtered.filter(product => {
        if (filterType === 'price') {
          return product.price.toString().includes(searchText);
        } else if (filterType === 'store') {
          return product.store.toLowerCase().includes(searchText.toLowerCase());
        }
        return product.name.toLowerCase().includes(searchText.toLowerCase()); // Default search by name
      });
    }

    // Separate bought and unbought items and sort them
    const unbought = filtered.filter(p => !p.bought).sort((a, b) => a.name.localeCompare(b.name));
    const bought = filtered.filter(p => p.bought).sort((a, b) => a.name.localeCompare(b.name)); // Bought items at the end [cite: 9]

    const sections = [];
    if (unbought.length > 0) {
      sections.push({ title: 'Do Kupienia', data: unbought });
    }
    if (bought.length > 0) {
      sections.push({ title: 'Kupione', data: bought });
    }
    return sections;
  };

  const sections = applyFiltersAndSorting();

  const toggleBoughtStatus = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, bought: !product.bought } : product
      )
    );
  };

  const deleteProduct = (id) => {
    Alert.alert(
      "Usuń Produkt",
      "Czy na pewno chcesz usunąć ten produkt?",
      [
        {
          text: "Anuluj",
          style: "cancel"
        },
        { text: "Usuń", onPress: () => setProducts(prevProducts => prevProducts.filter(product => product.id !== id)) }
      ]
    );
  };

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product }); // Pass product data [cite: 31]
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista Zakupów</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct', { onAddProduct: (newProduct) => {
            setProducts(prevProducts => [{ id: Date.now().toString(), ...newProduct, bought: false }, ...prevProducts]); // Add to top [cite: 7]
          }})}
        >
          <Text style={styles.addButtonText}>Dodaj Produkt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filtruj..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Cena" onPress={() => setFilterType('price')} />
        <Button title="Sklep" onPress={() => setFilterType('store')} />
        <Button title="Reset" onPress={() => { setSearchText(''); setFilterType(null); }} />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onToggleBought={toggleBoughtStatus}
            onDelete={deleteProduct}
            onPress={navigateToProductDetail}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>Brak produktów na liście.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust for status bar
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;