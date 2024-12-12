import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import TruckRequestScreen from '../screens/TruckRequestScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TruckRequestScreen" component={TruckRequestScreen} />
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
