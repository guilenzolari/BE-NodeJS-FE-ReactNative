import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeView from '../screens/HomeView';
import SearchView from '../screens/SearchView';
import ProfileView from '../screens/ProfileView';

const Tab = createBottomTabNavigator();

const icons: Record<string, (focused: boolean) => string> = {
  Friends: focused => (focused ? 'people' : 'people-outline'),
  Search: focused => (focused ? 'search' : 'search-outline'),
  Me: focused => (focused ? 'person' : 'person-outline'),
};

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = icons[route.name](focused);
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Friends" component={HomeView} />
      <Tab.Screen name="Search" component={SearchView} />
      <Tab.Screen name="Me" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
