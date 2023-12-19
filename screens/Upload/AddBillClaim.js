import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { globalStyles, white, black, midnightGreen } from '../../constants/Styles';

const AddBillClaim = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { fileType } = route.params;

  const [fileSource, setFileSource] = useState('');
  const [fileName, setFileName] = useState('');

  const openPicker = async () => {

    try {
      let result;
      if (fileType === 'document') {
        result = await DocumentPicker.getDocumentAsync();
      } else if (fileType === 'image') {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync();
      }

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const name = result.assets[0].name;

        setFileSource(uri);
        setFileName(name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        return;
      }

      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        const uri = result.assets[0].uri;

        setFileSource(uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createBlob = async () => {
    const file = await fetch(fileSource);
    const blob = await file.blob();
    navigation.navigate('File Type', { blob: blob });
  }

  return (
    <View style={[
      globalStyles.flex1, 
      globalStyles.justifyContentSpaceBetween
    ]}>

      {!fileSource && (
        <View style={[
          globalStyles.flex1, 
          globalStyles.alignItemsCenter,
          globalStyles.justifyContentCenter,
          globalStyles.padding10
        ]}>
          {fileType === 'document' ? <FontAwesomeIcon icon={ faFileArrowUp } size={ 24 } /> : <FontAwesomeIcon icon={ faFileImage } size={ 24 } />}

          <Button 
            style={[
              globalStyles.alignSelfCenter, 
              globalStyles.borderRadius10, 
              globalStyles.margin10
            ]}
            labelStyle={[
              globalStyles.h5
            ]}
            buttonColor={ midnightGreen }
            textColor={ white }
            onPress={() => {
              setFileSource('');
              setFileName('');
              (fileType === 'document' || fileType === 'image') ? openPicker() : openCamera();
            }}
          >
            Select a {fileType === 'document' ? 'document' : 'image'}
          </Button>
        </View>
      )}

      {fileSource && (
        <View style={[
          globalStyles.flex1, 
          globalStyles.alignItemsCenter, 
          globalStyles.justifyContentSpaceBetween, 
          globalStyles.padding10
        ]}>
          {fileType !== 'document' && (
            <Image 
              style={[
                globalStyles.flex1, 
                globalStyles.resizeModeContain,
                globalStyles.aspectRatio1,
              ]}
              source={{ uri: fileSource }}
            />
          )}

          {fileType === 'document' && (
            <Image 
              style={[
                globalStyles.flex1, 
                globalStyles.resizeModeContain,
                globalStyles.aspectRatio1_2,
              ]} 
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/afford-health.appspot.com/o/AppAssets%2FThumbnailDocUnavailableGreen.png?alt=media&token=12d9805e-2621-4829-8a08-da4342d8fa61' }}
            />
          )}

          {fileName &&
            <Text style={[
              globalStyles.textAlignCenter, 
              globalStyles.body,
              globalStyles.margin10,
            ]}>
              {`Selected File: ${fileName}`}
            </Text>
          }

          {fileType !== 'document' && (
            <View style={[
              globalStyles.margin10,
            ]}>
              <Text style={[
                globalStyles.textAlignCenter, 
                globalStyles.h5
              ]}>
                Check the Image before proceeding
              </Text>
              <Text style={[
                globalStyles.textAlignCenter, 
                globalStyles.body
              ]}>
                Is the whole document in the frame?
              </Text>
              <Text style={[
                globalStyles.textAlignCenter, 
                globalStyles.body
              ]}>
                Is the picture clear or blurry in the frame?
              </Text>
            </View>
          )}

          <View style={[
            globalStyles.padding10,
            globalStyles.margin10,
            globalStyles.width100
          ]}>
            <Button 
              style={[
                globalStyles.alignSelfCenter, 
                globalStyles.margin10,
                globalStyles.borderRadius10,
                globalStyles.width100
              ]}
              labelStyle={[
                globalStyles.h5
              ]}
              buttonColor={white}
              textColor={black}
              onPress={() => {
                setFileSource('');
                setFileName('');
                (fileType === 'document' || fileType === 'image') ? openPicker() : openCamera();
              }}
            >
              Select a different {fileType === 'document' ? 'document' : 'image'}
            </Button>
            <Button 
              style={[
                globalStyles.alignSelfCenter, 
                globalStyles.margin10,
                globalStyles.borderRadius10,
                globalStyles.width100
              ]}
              labelStyle={[
                globalStyles.h5
              ]}
              buttonColor={midnightGreen}
              textColor={white}
              onPress={() => {
                createBlob();
              }}
            >
              Use this {fileType === 'document' ? 'document' : 'image'}
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default AddBillClaim;
