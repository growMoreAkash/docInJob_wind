import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const DropdownMenu = ({ display, options, onSelect }) => {
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
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        {display}
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
    padding: 10,
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
