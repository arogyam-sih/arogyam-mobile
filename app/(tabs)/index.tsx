import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

<<<<<<< HEAD
import * as Location from "expo-location";

export default function Tab() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(text);

=======
type Item = {
  name: string;
  type: string;
  time: string;
  price: string;
};

const AppointmentItem = ({ item }: { item: Item }) => (
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
    <Feather name="more-vertical" size={20} color="#C7C7CC" />
  </View>
);

export default function Tab() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const l = [
      { name: 'John Doe', type: 'Dentist', time: '10:00 AM', price: '$100' },
      { name: 'John Smith', type: 'Dentist', time: '12:00 PM', price: '$100' },
      { name: 'John Johnson', type: 'Dentist', time: '2:00 PM', price: '$100' },
      { name: 'John Jackson', type: 'Dentist', time: '4:00 PM', price: '$100' },
      { name: 'John James', type: 'Dentist', time: '6:00 PM', price: '$100' },
    ];
    setItems(l);
  }, []);

>>>>>>> 9c0c300 (feat: appointments)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointments</Text>
      </View>
      <ScrollView style={styles.listContainer}>
        {items.map((item, index) => (
          <AppointmentItem key={index} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
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
