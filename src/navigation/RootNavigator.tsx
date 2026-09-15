import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import StandingsScreen from '@screens/StandingsScreen';
import FavoritesScreen from '@screens/FavoritesScreen';
import TeamDetailScreen from '@screens/TeamDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="TeamDetail"
        component={TeamDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Team Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

function StandingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Standings" component={StandingsScreen} />
      <Stack.Screen
        name="TeamDetail"
        component={TeamDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Team Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen
        name="TeamDetail"
        component={TeamDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Team Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0066cc',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Matches',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏟️</Text>,
          }}
        />
        <Tab.Screen
          name="StandingsTab"
          component={StandingsStack}
          options={{
            tabBarLabel: 'Table',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text>,
          }}
        />
        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⭐</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Add Text import
import { Text } from 'react-native';

export default RootNavigator;
