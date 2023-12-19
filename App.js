import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RightHeader from './components/RightHeader';
import Home from './screens/Home';
import AddEvent from './screens/Events/AddEvent';
import EventsHome from './screens/Events/EventsHome';
import EventSummary from './screens/Events/EventSummary';
import ServiceDetails from './screens/Events/ServiceDetails';
import AddBillClaim from './screens/Upload/AddBillClaim';
import FileType from './screens/Upload/FileType';
import ConfirmDocumentDetails from './screens/Upload/ConfirmDocumentDetails';
import { MainMenuContext, MainFabContext, SubMenuContext } from './helpers/Context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isMainMenuVisible, setIsMainMenuVisible] = useState(false);
  const toggleMainMenu = () => setIsMainMenuVisible(!isMainMenuVisible);

  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const toggleSubMenu = () => setIsSubMenuVisible(!isSubMenuVisible);
  const [subMenuType, setSubMenuType] = useState('');

  const [fabState, setFabState] = useState({ open: false });
  const onFabStateChange = ({ open }) => setFabState({ open });
  const { open } = fabState;

  return (
    <SafeAreaProvider>
      <MainMenuContext.Provider value={{ isMainMenuVisible, toggleMainMenu }}>
        <SubMenuContext.Provider value={{ isSubMenuVisible, toggleSubMenu, subMenuType, setSubMenuType }}>
          <MainFabContext.Provider value={{ open, onFabStateChange }}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} 
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Events Home" component={EventsHome}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Event Summary" component={EventSummary}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Service Details" component={ServiceDetails}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Add Bill/Claim" component={AddBillClaim}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="File Type" component={FileType}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Confirm Document Details" component={ConfirmDocumentDetails}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
                <Stack.Screen name="Add Event" component={AddEvent}
                  options={{
                    headerRight: () => <RightHeader></RightHeader>
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </MainFabContext.Provider>
        </SubMenuContext.Provider>
      </MainMenuContext.Provider>
    </SafeAreaProvider>
  );
}