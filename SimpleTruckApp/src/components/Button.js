// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// const Button = ({ title, onPress }) => (
//   <TouchableOpacity style={styles.button} onPress={onPress}>
//     <Text style={styles.buttonText}>{title}</Text>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Button;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install this package
import { MaterialIcons } from '@expo/vector-icons'; // Optional: for icons

const Button = ({ title, onPress, iconName }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <LinearGradient
      colors={['#4CAF50', '#2E7D32']} // Gradient colors
      style={styles.button}
    >
      <View style={styles.buttonContent}>
        {iconName && <MaterialIcons name={iconName} size={20} style={styles.icon} />}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    color: '#fff',
    marginRight: 10, // Space between icon and text
  },
});

export default Button;
