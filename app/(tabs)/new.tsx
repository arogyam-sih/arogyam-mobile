import { Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

import * as Location from "expo-location";
import { Input } from "@/components/Input";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function Tab() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [hospitals, setHospitals] = useState<string[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate ?? new Date());
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // fetch server
      const hos = ["Hospital 1", "Hospital 2", "Hospital 3"];
      setHospitals(hos);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let hoss = ["Loading"];
  if (hospitals) {
    hoss = hospitals;
  }

  return (
    <SafeAreaView>
      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          {hoss.map((v) => (
            <Picker.Item label={v} value={v} key={v} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          margin: 15,
        }}
      >
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}>Book Appointment</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <Input label="Name" placeholder="Enter your name" />
          <Input label="What's wrong?" placeholder="Enter symptoms" />
          <Input label="Any additional details?" placeholder="Enter additional details" />
          <Text>Select Appointment Date & Time</Text>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
          }}>
            <Button onPress={showDatepicker} title="Date" />
            <Button onPress={showTimepicker} title="Time" />
          </View>
          <Text>Selected: {date.toLocaleString()}</Text>
          <Button color="rgb(62, 180, 137)" title="Submit"></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
