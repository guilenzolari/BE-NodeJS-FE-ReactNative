import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeView from '../screens/HomeView';
import SearchView from '../screens/SearchView';
import ProfileView from '../screens/ProfileView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendProfileView from '../screens/FriendProfileView';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const FriendsStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ title: t('pageTitle.friends') }}
      />
      <Stack.Screen
        name="FriendProfileView"
        component={FriendProfileView}
        options={{ title: t('pageTitle.friendProfile') }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchView"
        component={SearchView}
        options={{ title: t('pageTitle.search') }}
      />
      <Stack.Screen
        name="FriendProfileView"
        component={FriendProfileView}
        options={{ title: t('searchView.search') }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        options={{ title: t('pageTitle.profile') }}
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
  const { t } = useTranslation();

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
      <Tab.Screen
        name="Friends"
        component={FriendsStack}
        options={{ tabBarLabel: t('pageTitle.friends') }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ tabBarLabel: t('pageTitle.search') }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileStack}
        options={{ tabBarLabel: t('pageTitle.profile') }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
