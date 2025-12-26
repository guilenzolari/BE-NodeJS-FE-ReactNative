import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeView from '../screens/HomeView';
import SearchView from '../screens/SearchView';
import ProfileView from '../screens/ProfileView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendProfileView from '../screens/FriendProfileView';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const FriendsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ title: 'Friends' }}
      />
      <Stack.Screen
        name="FriendProfileView"
        component={FriendProfileView}
        options={{ title: 'Friend Profile' }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        options={{ title: 'Me' }}
      />
    </Stack.Navigator>
  );
};

const icons: Record<string, (focused: boolean) => string> = {
  Friends: focused => (focused ? 'people' : 'people-outline'),
  Search: focused => (focused ? 'search' : 'search-outline'),
  Me: focused => (focused ? 'person' : 'person-outline'),
};

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  routeName: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  size,
  routeName,
}) => {
  const iconName = icons[routeName](focused);
  return <Icon name={iconName} size={size} color={color} />;
};

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: props => <TabBarIcon {...props} routeName={route.name} />,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Friends" component={FriendsStack} />
      <Tab.Screen name="Search" component={SearchView} />
      <Tab.Screen name="Me" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
