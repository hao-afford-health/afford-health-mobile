import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, RadioButton, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '../../utils/FirebaseStorage';
import { supportedFiles } from '../../constants/SupportedFiles';
import { globalStyles, white, black, midnightGreen } from '../../constants/Styles';

const FileType = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { blob } = route.params;
  
  let extension = '';
  if (blob.type in supportedFiles) {
    extension = supportedFiles[blob.type];
  }

  const data = ['Medical Bill', 'EOB'];

  const [value, setValue] = useState(data[0]);

  const getRemotePath = async () => {
    const uri = uuidv4();
    const fileType = value.split(' ').join('');
    const remotePath = await uploadFile(fileType, uri + extension, blob);
    navigation.navigate('Confirm Document Details', { fileType: fileType, remotePath: remotePath });
  }

  return (
    <View style={[
      globalStyles.flex1, 
      globalStyles.alignItemsCenter, 
      globalStyles.justifyContentSpaceBetween, 
      globalStyles.padding10
    ]}>
      <View>
        <Text style={[
          globalStyles.textAlignCenter, 
          globalStyles.body
        ]}>
          What type of document is this?
        </Text>

        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          {data && data.map((item) => 
            <View style={[
              globalStyles.flexDirectionRow, 
              globalStyles.alignItemsCenter
            ]} 
              key={item}
            >
              <RadioButton value={item} color='green'/>
              <Text style={[
                globalStyles.h5
              ]}>
                {item}
              </Text>
            </View>
          )}
        </RadioButton.Group>
      </View>

      <View style={[
        globalStyles.flexDirectionRow
      ]}>
        <Button 
          style={[
            globalStyles.alignSelfCenter, 
            globalStyles.margin10,
            globalStyles.borderRadius10
          ]}
          labelStyle={[
            globalStyles.h5
          ]}
          buttonColor={white}
          textColor={black}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Go back
        </Button>
        <Button 
          style={[
            globalStyles.alignSelfCenter, 
            globalStyles.margin10,
            globalStyles.borderRadius10
          ]}
          labelStyle={[
            globalStyles.h5
          ]}
          buttonColor={midnightGreen}
          textColor={white}
          onPress={() => {
            getRemotePath();
          }}
        >
          Analyze file
        </Button>
      </View>
    </View>
  )
}

export default FileType;