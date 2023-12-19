import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Text, Button, TextInput, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postEvent } from '../../api/events';
import { globalStyles, white, quickSilver, midnightGreen, } from '../../constants/Styles';

const AddEvent = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const submit = async () => {
    Keyboard.dismiss();

    let event = {
      title: title.trim(),
      description: description.trim(),
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
    };

    const eventResult = await postEvent(event);

    showDialog();
  }
  
  const confirm = () => {
    hideDialog();
    navigation.goBack();
  }

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} style={[
          globalStyles.backgroundColorWhite
        ]}>
          <Dialog.Title style={[
            globalStyles.h5
          ]}>
            Success
          </Dialog.Title>
          <Dialog.Content>
            <Text style={[
              globalStyles.body
            ]}>
              {`You've added the event: ${title.trim()}.`}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={[
            globalStyles.alignSelfCenter
          ]}>
            <Button 
              style={[
                globalStyles.borderRadius10
              ]}
              buttonColor={midnightGreen}
              textColor={white}
              onPress={confirm}
            >
              Finish
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <KeyboardAwareScrollView contentContainerStyle={[
        globalStyles.padding10,
        globalStyles.margin10,
      ]}>
        <Text style={[
          globalStyles.body
        ]}>
          Please provide the following information about your healthcare event
        </Text>

        <TextInput
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          mode="outlined"
          placeholder='Add Title'
          activeOutlineColor={quickSilver}
          textColor={midnightGreen}
          style={[
            globalStyles.backgroundColorWhite, 
            globalStyles.margin5
          ]}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          mode="outlined"
          placeholder='Add Description'
          activeOutlineColor={quickSilver}
          textColor={midnightGreen}
          style={[
            globalStyles.backgroundColorWhite, 
            globalStyles.margin5
          ]}
        />

        <View style={[
          globalStyles.flexDirectionRow, 
          globalStyles.alignItemsCenter,
          globalStyles.margin10
        ]}>
          <Text style={[
            globalStyles.body
          ]}>
            Start Date / Time
          </Text>

          <DateTimePicker
            value={startDate}
            mode='date'
            is24Hour={true}
            onChange={onStartDateChange}
          />

          <DateTimePicker
            value={startDate}
            mode='time'
            is24Hour={true}
            onChange={onStartDateChange}
          />
        </View>

        <View style={[
          globalStyles.flexDirectionRow, 
          globalStyles.alignItemsCenter,
          globalStyles.margin10
        ]}>
          <Text style={[
            globalStyles.body
          ]}>
            End Date / Time
          </Text>

          <DateTimePicker
            value={endDate}
            mode='date'
            is24Hour={true}
            onChange={onEndDateChange}
          />

          <DateTimePicker
            value={endDate}
            mode='time'
            is24Hour={true}
            onChange={onEndDateChange}
          />
        </View>

        <Button 
          style={[
            globalStyles.alignSelfCenter, 
            globalStyles.borderRadius10
          ]}
          labelStyle={[
            globalStyles.h5
          ]}
          buttonColor={midnightGreen}
          textColor={white}
          disabled={!title}
          onPress={submit}
        >
          Add Event
        </Button>
      </KeyboardAwareScrollView>
    </PaperProvider>
  )
}

export default AddEvent;