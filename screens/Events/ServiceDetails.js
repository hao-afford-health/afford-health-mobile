import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Divider, Card, DataTable, ProgressBar } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClipboard, faFile } from '@fortawesome/free-regular-svg-icons';
import { faShield, faStethoscope, faFlask } from '@fortawesome/free-solid-svg-icons';
import { eventsData } from '../../constants/EventsData';

const ServiceDetails = () => {
  const route = useRoute();

  const { eventIndex, providerIndex, serviceIndex, itemIndex } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <FontAwesomeIcon icon={ faClipboard } />
        <Text variant="bodyLarge">
          {`CPT Service Code: ${eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].code}`}
        </Text>
      </View>
      <Text variant="labelLarge">
        {eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].description}
      </Text>
      <Text variant="labelLarge">
        Learn More
      </Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="labelLarge">
            {eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].status}
          </Text>
          <Text variant="labelLarge">
            {eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].detail}
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            textColor='#000'
            style={styles.button}
          >
            Contact your healthcare provider
          </Button>
        </Card.Actions>
      </Card>

      <Divider />

      <View style={styles.row}>
        <FontAwesomeIcon icon={ eventsData[eventIndex].healthcare_providers[providerIndex].type === 'Medical Doctor' ? faStethoscope : faFlask}  />
        <View>
          <View style={styles.rowContainer}>
            <Text variant="labelLarge">
              {`HCP: ${eventsData[eventIndex].healthcare_providers[providerIndex].type}`}
            </Text>
            <Text variant="labelLarge">
              {`${eventsData[eventIndex].healthcare_providers[providerIndex].network}`}
            </Text>
          </View>

          <Text variant="bodyLarge">
            {eventsData[eventIndex].healthcare_providers[providerIndex].name}
          </Text>
          <Text variant="bodyLarge">
            {eventsData[eventIndex].healthcare_providers[providerIndex].organization}
          </Text>
        </View>
      </View>
      
      <Text variant="bodyLarge">
        Related Charges
      </Text>

      <Text variant="labelLarge">
        Insurance Plan Responsibility
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].insurance_plan_charges.map((item) => (
          <DataTable.Row key={item.description}>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <FontAwesomeIcon icon={ faFile } />
            <Text variant="labelLarge">
              This claim is not subject to your annual deductible.
            </Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            textColor='#000'
            style={styles.button}
          >
            Learn More
          </Button>
        </Card.Actions>
      </Card>

      <Text variant="labelLarge">
        Patient Responsibility
      </Text>
      <DataTable style={styles.datatable}>
        <DataTable.Header>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {eventsData[eventIndex].healthcare_providers[providerIndex].services[serviceIndex].items[itemIndex].patient_charges.map((item) => (
          <DataTable.Row key={item.description}>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      
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
          <Text variant="labelLarge">
            {`Good news! You've made it ${eventsData[eventIndex].paid / eventsData[eventIndex].deductible * 100}% to meeting your plan's deductible for the year`}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.rowContainer}>
          <Text variant="labelLarge">
            $0
          </Text>
          <Text variant="labelLarge">
            {`$${eventsData[eventIndex].deductible}`}
          </Text>
        </View>
        <ProgressBar progress={eventsData[eventIndex].paid / eventsData[eventIndex].deductible} color='#000' stlye={styles.progressBar}></ProgressBar>
      </View>
    </ScrollView>
  )
}

export default ServiceDetails;

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
  card: {
    borderRadius: 0,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  cardActions: {
    alignSelf: 'center',
  },
  progressBar: {
    padding: 10,
  }
})