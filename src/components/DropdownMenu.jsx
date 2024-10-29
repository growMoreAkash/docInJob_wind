import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const DropdownMenu = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      {/* Selected option */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.selectedText}>{selectedOption || "Select an option"}</Text>
      </TouchableOpacity>

      {/* Dropdown options */}
      {isVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
  },
  selectedText: {
    fontSize: 16,
  },
  dropdownContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropdownMenu;
