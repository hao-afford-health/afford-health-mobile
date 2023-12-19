import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Divider, Card, Chip, TouchableRipple } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { eventsData } from '../../constants/EventsData';

const EventsHome = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="bodyLarge">
        This is a list of your healthcare events, including office visits, emergency care, tests, and more.
      </Text>

      <View style={styles.rowContainer}>
        <FontAwesomeIcon icon={ faMagnifyingGlass } size={24} />
        <View style={styles.pickerContainer}>
          <Text variant="bodyLarge">
            Sorting A-Z
          </Text>
          <Chip style={styles.chip}>by Category</Chip>
        </View>
        <View style={styles.pickerContainer}>
          <Text variant="bodyLarge">
            Filtering by:
          </Text>
          <Chip style={styles.chip}>Active Events</Chip>
        </View>
        <FontAwesomeIcon icon={ faBars } size={24} />
      </View>

      <Divider />

      {eventsData && eventsData.map((event, eventIndex) => 
        <TouchableRipple key={eventIndex} onPress={() => navigation.navigate('Event Summary', { eventIndex })}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyLarge">
                {event.category}
              </Text>
              <Text variant="bodyLarge">
                {event.date}
              </Text>
              <Text variant="bodyLarge">
                {event.title}
              </Text>
              <Text variant="bodyLarge">
                {`Healthcare Provider: ${event.healthcare_providers[eventIndex].name}`}
              </Text>

              <View style={styles.rowContainer}>
                {event.tags && event.tags.map(tag => 
                  <Chip key={tag} style={styles.chip}>{tag}</Chip>
                )}
              </View>
            </Card.Content>
          </Card>
        </TouchableRipple>
      )}
    </ScrollView>
  )
}

export default EventsHome;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  card: {
    borderRadius: 0,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  chip: {
    borderRadius: 50,
    backgroundColor: '#808080',
  },
  pickerContainer: {
    alignItems: 'center',
  }
})