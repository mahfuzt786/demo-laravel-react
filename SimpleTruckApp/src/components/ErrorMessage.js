// import React from 'react';
// import { Text, StyleSheet } from 'react-native';

// const ErrorMessage = ({ error }) => {
//   if (!error) return null;
//   return <Text style={styles.errorText}>{error}</Text>;
// };

// const styles = StyleSheet.create({
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default ErrorMessage;

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install this package

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={20} style={styles.icon} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6', // Light red background
    borderColor: '#ffcccc', // Light red border
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
    color: '#d9534f', // Icon color
    marginRight: 10, // Space between icon and text
  },
  errorText: {
    color: '#d9534f', // Text color
    fontSize: 16,
    fontWeight: 'bold', // Bold text
  },
});

export default ErrorMessage;