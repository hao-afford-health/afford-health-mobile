import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Divider, List, TouchableRipple } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClipboard, faCalendar, faFolder } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faShield, faStethoscope, faFlask } from '@fortawesome/free-solid-svg-icons';
import { eventsData } from '../../constants/EventsData';

const EventSummary = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { eventIndex } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <FontAwesomeIcon icon={ faClipboard } />
        <View>
          <Text variant="labelLarge">
            Event Description
          </Text>
          <Text variant="bodyLarge">
            {eventsData[eventIndex].title}
          </Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <FontAwesomeIcon icon={ faCalendar } />
          <View>
            <Text variant="labelLarge"> 
              Date of Service
            </Text>
            <Text variant="bodyLarge">
              {eventsData[eventIndex].date}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <FontAwesomeIcon icon={ faFolder } />
          <View>
            <Text variant="labelLarge">
              Category
            </Text>
            <Text variant="bodyLarge">
              {eventsData[eventIndex].category}
            </Text>
          </View>
        </View>

      </View>

      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <FontAwesomeIcon icon={ faCoins } />
          <View>
            <Text variant="labelLarge">
              Total Amount Due
            </Text>
            <Text variant="bodyLarge">
              {`$${eventsData[eventIndex].total}`}
            </Text>
            <Text variant="labelLarge">
              Learn More
            </Text>
          </View>
        </View>

        <Button
          mode='outlined'
          textColor='#000'
          style={styles.button}
        >
          Pay Balance
        </Button>
      </View>

      <Divider />

      <View style={styles.row}>
        <FontAwesomeIcon icon={ faShield } />
        <View>
          <Text variant="labelLarge">
            Insurance Plan
          </Text>
          <Text variant="bodyLarge">
            {eventsData[eventIndex].insurance_plan}
          </Text>
        </View>
      </View>

      <Divider />

      {eventsData[eventIndex].healthcare_providers && eventsData[eventIndex].healthcare_providers.map((provider, providerIndex) => 
        <View key={providerIndex}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={ provider.type === 'Medical Doctor' ? faStethoscope : faFlask } />
            <View>
              <View style={styles.rowContainer}>
                <Text variant="labelLarge">
                  {`HCP: ${provider.type}`}
                </Text>
                <Text variant="labelLarge">
                  {provider.network}
                </Text>
              </View>
              <Text variant="bodyLarge">
                {provider.name}
              </Text>
              <Text variant="bodyLarge">
                {provider.organization}
              </Text>
            </View>
          </View>

          {provider.services && provider.services.map((service, serviceIndex) =>
            <List.Accordion
              title={`Show Services: ${serviceIndex + 1}/${provider.services.length}`}
              description={`Amount: $${service.total}`}
              style={styles.listAccordion}
              titleStyle={styles.listAccordionTitle}
              key={serviceIndex}
            >
              {service.items && service.items.map((item, itemIndex) =>
                <TouchableRipple key={itemIndex} onPress={() => navigation.navigate('Service Details', { eventIndex, providerIndex, serviceIndex, itemIndex })}>
                  <List.Item 
                    title={`CPT Service Code: ${item.code} ${item.status}`} 
                    description={item.description} 
                  />
                </TouchableRipple>
              )}
            </List.Accordion>
          )}
        </View>
      )}
    </ScrollView>
  )
}

export default EventSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 0,
    margin: 10,
  },
  listAccordion: {
    backgroundColor: '#fff'
  },
  listAccordionTitle: {
    color: '#000'
  },
})