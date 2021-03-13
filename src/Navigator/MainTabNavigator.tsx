import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Scanner from '../Scanner/Scanner';
import TicketsList from '../TicktesList/TicketsList';
import styles from './MainTabNavigator.style';
import { View } from 'react-native';
import { faBarcode, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Tickets"
            component={TicketsList}
            options={{
              tabBarIcon: () => <FontAwesomeIcon icon={faTicketAlt} />,
              tabBarTestID: 'TicketsNav',
            }}
          />
          <Tab.Screen
            name="Scan Tickets"
            component={Scanner}
            options={{
              tabBarIcon: () => <FontAwesomeIcon icon={faBarcode} />,
              tabBarTestID: 'ScanTicetsNav',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainTabNavigator;
