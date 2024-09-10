import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const appointments = [
  { id: '1', name: 'Shawn Hampton', type: 'Emergency appointment', time: '9:00' },
  { id: '2', name: 'Polly Paul', type: 'USG + Consultation', time: '9:30', price: '€ 80' },
  { id: '3', name: 'Jessie Paul', type: 'Laboratory screening', time: '10:30', price: '€ 25' },
  { id: '4', name: 'Mabel Perkins', type: 'Keeping pregnant', time: '11:30' },
  { id: '5', name: 'Jayden Hall', type: 'Primary doctor consultation', time: '12:30' },
];

const AppointmentItem = ({ item }: { item: any }) => (
  <View style={styles.appointmentItem}>
    <Image
      source={{ uri: 'https://via.placeholder.com/40' }}
      style={styles.avatar}
    />
    <View style={styles.appointmentInfo}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
    </View>
    <View style={styles.timePrice}>
      <Text style={styles.time}>{item.time}</Text>
      {item.price && <Text style={styles.price}>{item.price}</Text>}
    </View>
    <Feather name="phone" size={20} color="#007AFF" />
    <Feather name="more-vertical" size={20} color="#C7C7CC" />
  </View>
);

const AppointmentList = () => (
  <FlatList
    data={appointments}
    renderItem={({ item }) => <AppointmentItem item={item} />}
    keyExtractor={item => item.id}
    style={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF',
  },
  type: {
    fontSize: 14,
    color: '#8E8E93',
  },
  timePrice: {
    marginRight: 15,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  price: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default AppointmentList;