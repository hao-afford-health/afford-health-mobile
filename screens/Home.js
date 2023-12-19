import React, { useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Chip, List, Surface } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import MainFAB from '../components/MainFAB';
import SideDrawer from '../components/Drawer/SideDrawer';
import BottomDrawer from '../components/Drawer/BottomDrawer';
import { getHealth } from '../api/health';
import { globalStyles, white } from '../constants/Styles';

const { width, height } = Dimensions.get('window');

const Home = () => {
  useEffect(() => {
    getHealth().then(result => {
      console.log(result);
    });
  }, []);

  const insets = useSafeAreaInsets();
  const paddings = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingBottom: insets.bottom,
    paddingRight: insets.right,
  };

  const data = {
    total: '$30',
    onboarding: [
      {title: 'Insurance Providers', description: 'Incomplete'},
      {title: 'Create an Event', description: 'Incomplete'},
      {title: 'Record Coverage', description: 'Incomplete'},
    ]
  };

  return (
    <View style={[
      globalStyles.flex1,
      paddings
    ]}>
      <ScrollView>
        <Chip
          style={[
            globalStyles.paddingHorizontal10, 
            globalStyles.margin5, 
            globalStyles.borderRadius50, 
            globalStyles.backgroundColorCoralReef
          ]} 
          textStyle={[
            globalStyles.h5, 
            globalStyles.colorWhite
          ]}
          icon={() => <FontAwesomeIcon icon={ faCalendarCheck } color={ white } size={24} />} 
          closeIcon={() => <FontAwesomeIcon icon={ faAngleRight } color={ white } size={24} />}
        >
          {`Upcoming Payment: ${data.total}`}
        </Chip>

        <Text style={[
          globalStyles.padding10, 
          globalStyles.margin5, 
          globalStyles.h2
        ]}>
          What's new
        </Text>

        <Surface 
          style={[[
            globalStyles.justifyContentCenter,
            globalStyles.alignItemsCenter,
            globalStyles.alignSelfCenter,
            globalStyles.backgroundColorWhite,
            globalStyles.padding10,
            globalStyles.margin10
          ], {
            width: width / 1.3,
            height: width / 1.3,
            borderRadius: Math.round(width + height) / 2
          }]} 
          elevation={5}
        >
          <Text style={[
            globalStyles.textAlignCenter,
            globalStyles.margin10,
            globalStyles.h3,
            globalStyles.colorCoralReef
          ]}>
            We've caught something!
          </Text>
          <Text style={[
            globalStyles.textAlignCenter,
            globalStyles.margin10, 
            globalStyles.h4
          ]}>
            Your 11/17 bill from One Medical needs attention
          </Text>
          <Text style={[
            globalStyles.textAlignCenter,
            globalStyles.margin10,
            globalStyles.h4,
            globalStyles.colorMidnightGreen
          ]}>
            Take a look
          </Text>
        </Surface>
    
        <List.Section style={[
          globalStyles.marginVertical10, 
          globalStyles.borderRadius10, 
          globalStyles.backgroundColorMetallicSeaweed
        ]}>
          <List.Subheader style={[
            globalStyles.h3,
            globalStyles.colorWhite
          ]}>
            Finish Onboarding
          </List.Subheader>
          {data.onboarding && data.onboarding.map(item => 
            <List.Item
              key={item.title}
              title={item.title}
              description={item.description}
              right={() => <FontAwesomeIcon icon={ faAngleRight } color={ white } size={24} />}
              style={[
                globalStyles.backgroundColorLightSeaGreen
              ]}
              titleStyle={[
                globalStyles.h5,
                globalStyles.colorWhite
              ]}
              descriptionStyle={[
                globalStyles.h5,
                globalStyles.colorWhite
              ]}
            />
          )}
        </List.Section>
      </ScrollView>
      <MainFAB></MainFAB>
      <SideDrawer></SideDrawer>
      <BottomDrawer></BottomDrawer>
    </View>
  );
}

export default Home;