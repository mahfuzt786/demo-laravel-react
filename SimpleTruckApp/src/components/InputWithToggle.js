// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const InputWithToggle = ({ placeholder, value, onChangeText }) => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   return (
//     <View style={styles.inputContainer}>
//       <TextInput
//         style={styles.input}
//         placeholder={placeholder}
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={!isPasswordVisible}
//       />
//       <TouchableOpacity
//         onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//         style={styles.iconContainer}
//       >
//         <Ionicons
//           name={isPasswordVisible ? 'eye-off' : 'eye'}
//           size={24}
//           color="gray"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//   },
//   iconContainer: {
//     padding: 5,
//   },
// });

// export default InputWithToggle;

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install this package

const InputWithToggle = ({ placeholder, value, onChangeText, iconName }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#f9f9f9', '#e0e0e0']} // Light gradient background
      style={styles.inputContainer}
    >
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={24} color="#4C0000" /> {/* Prepend icon */}
      </TouchableOpacity> 
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        placeholderTextColor="#aaa" // Customize placeholder color
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        style={styles.iconContainer}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="#4CAF50" // Icon color
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333', // Text color
  },
  iconContainer: {
    // padding: 5,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 13, // Center the icon vertically
    color: '#888', // Icon color
  },
});

export default InputWithToggle;
