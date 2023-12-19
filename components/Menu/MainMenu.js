import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, List, Avatar, IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { globalStyles, white } from '../../constants/Styles';

const SubMenu = ({ text, data, toggleMainMenu }) => {
  const navigation = useNavigation();

  return (
    <List.Section style={[
      globalStyles.padding10
    ]}>
      <List.Subheader style={[
        globalStyles.margin_10, 
        globalStyles.h5,
        globalStyles.colorCaribbeanGreen
      ]}>
        {text}
      </List.Subheader>
      {data && data.map(item => 
        <List.Item
          key={item}
          title={item.split(' ')[0]}
          right={() => <FontAwesomeIcon icon={ faAngleRight } color={ white } size={24}/>}
          style={[
            globalStyles.margin_10
          ]}
          titleStyle={[
            globalStyles.h4,
            globalStyles.colorWhite
          ]}
          onPress={() => {
              toggleMainMenu();
              //navigation.navigate(item);
            }
          }
        />
      )}
    </List.Section>
  )
}

const MainMenu = ({ toggleMainMenu }) => {
  const insets = useSafeAreaInsets();
  const paddings = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingBottom: insets.bottom,
    paddingRight: insets.right,
  };

  const text1 = 'Manage My';
  const text2 = 'My Account';
  const text3 = 'App Version 0.1';
  const data1 = ['Bills', 'Providers', 'Events Home', 'Benefits'];
  const data2 = ['Learn', 'Share', 'Settings'];
  const data3 = ['View Notes'];

  return (
    <ScrollView contentContainerStyle={[
      globalStyles.flex1, 
      globalStyles.backgroundColorMidnightGreen, 
      paddings
    ]}>
      <IconButton
        icon={() => <FontAwesomeIcon icon={ faXmark } color={ white } size={24} />}
        onPress={toggleMainMenu}
      />
      <View style={[
        globalStyles.flexDirectionRow, 
        globalStyles.alignItemsCenter, 
        globalStyles.padding10, 
        globalStyles.gap10
      ]}>
        <Avatar.Text size={35} label="K" />
        <View>
          <Text style={[
            globalStyles.body,
            globalStyles.colorWhite, 
          ]}>
            Good Morning,
          </Text>
          <Text style={[
            globalStyles.body,
            globalStyles.colorWhite, 
          ]}>
            Katherine!
          </Text>
        </View>
      </View>

      <SubMenu text={text1} data={data1} toggleMainMenu={toggleMainMenu}></SubMenu>
      <SubMenu text={text2} data={data2} toggleMainMenu={toggleMainMenu}></SubMenu>
      <SubMenu text={text3} data={data3} toggleMainMenu={toggleMainMenu}></SubMenu>
    </ScrollView>
  )
}

export default MainMenu;