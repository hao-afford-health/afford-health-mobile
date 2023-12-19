import React from 'react';
import { View } from 'react-native';
import { List, Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faImage, faFolder } from '@fortawesome/free-regular-svg-icons';
import { globalStyles, black } from '../../constants/Styles';

const SubMenu = ({ toggleSubMenu, subMenuType }) => {
  const navigation = useNavigation();

  let menuContent = <></>;
  if (subMenuType === 'File') {
    menuContent = (
      <List.Section>
        <List.Item 
          title="Camera"
          left={() => <FontAwesomeIcon icon={ faCamera } size={ 24 } />}
          style={[
            globalStyles.padding10, 
            globalStyles.borderWidth1, 
            globalStyles.backgroundColorWhite
          ]}
          onPress={() => {
            toggleSubMenu();
            navigation.navigate('Add Bill/Claim', { fileType: 'camera' });
          }}
        >
        </List.Item>
        <List.Item 
          title="Photo & Video Library"
          left={() => <FontAwesomeIcon icon={ faImage } size={ 24 } />}
          style={[
            globalStyles.padding10, 
            globalStyles.borderWidth1, 
            globalStyles.backgroundColorWhite
          ]}
          onPress={() => {
            toggleSubMenu();
            navigation.navigate('Add Bill/Claim', { fileType: 'image' });
          }}
        >
        </List.Item>
        <List.Item 
          title="Document"
          left={() => <FontAwesomeIcon icon={ faFolder } size={ 24 } />}
          style={[
            globalStyles.padding10, 
            globalStyles.borderWidth1, 
            globalStyles.backgroundColorWhite
          ]}
          onPress={() => {
            toggleSubMenu();
            navigation.navigate('Add Bill/Claim', { fileType: 'document' });
          }}
        >
        </List.Item>
      </List.Section>
    )
  } else if (subMenuType === 'Event') {
    menuContent = (
      <List.Section>
        <List.Item 
          title="Add Event From Your Calendar"
          left={() => <FontAwesomeIcon icon={ faMagnifyingGlass } size={ 24 } />}
          style={[
            globalStyles.padding10, 
            globalStyles.borderWidth1, 
            globalStyles.backgroundColorWhite
          ]}
          onPress={() => {
            toggleSubMenu();
          }}
        >
        </List.Item>
        <List.Item 
          title="Manually Add Event"
          left={() => <FontAwesomeIcon icon={ faPlus } size={ 24 } />}
          style={[
            globalStyles.padding10, 
            globalStyles.borderWidth1, 
            globalStyles.backgroundColorWhite
          ]}
          onPress={() => {
            toggleSubMenu();
            navigation.navigate('Add Event');
          }}
        >
        </List.Item>
      </List.Section>
    )
  }

  return (
    <View style={[
      globalStyles.flex1, 
      globalStyles.justifyContentFlexEnd
    ]}>
      {menuContent}
      <Button 
        textColor={black}
        style={[
          globalStyles.borderRadius0, 
          globalStyles.backgroundColorWhite
        ]}
        onPress={toggleSubMenu}
      >
        Cancel
      </Button>
    </View>
  )
}

export default SubMenu;