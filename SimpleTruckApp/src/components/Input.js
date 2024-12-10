import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install this package

const Input = ({ placeholder, value, onChangeText, secureTextEntry, iconName }) => (
  <View style={styles.container}>
    {iconName && <MaterialIcons name={iconName} size={24} style={styles.icon} />}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#aaa" // Customize placeholder color
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 40, // Add padding for the icon
    backgroundColor: '#f9f9f9', // Light background color
    fontSize: 16,
    color: '#333', // Text color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 13, // Center the icon vertically
    color: '#888', // Icon color
  },
});

export default Input;
