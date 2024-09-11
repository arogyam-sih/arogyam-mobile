import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

type Appointment = {
  name: string;
  type: string;
  time: string;
  price: string;
  hospital: string;
};

const AppointmentItem = ({
  item,
  onPress,
}: {
  item: Appointment;
  onPress?: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.appointmentItem}>
    <View style={styles.appointmentInfo}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.hospital}>Hospital: {item.hospital}</Text>
    </View>
    <View style={styles.timePrice}>
      <Text style={styles.time}>{item.time}</Text>
      {item.price && <Text style={styles.price}>{item.price}</Text>}
    </View>
    <Feather name="more-vertical" size={20} color="#C7C7CC" />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [userName, setUserName] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [previousAppointments, setPreviousAppointments] = useState<
    Appointment[]
  >([]);
  const [ongoingAppointment, setOngoingAppointment] =
    useState<Appointment | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName !== null) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchUserName();

    // Mock data for appointments
    const mockAppointments = [
      {
        name: "John Doe",
        type: "Dentist",
        time: "10:00 AM",
        price: "$100",
        hospital: "St. Mary's",
      },
      {
        name: "Jane Smith",
        type: "Cardiologist",
        time: "2:00 PM",
        price: "$150",
        hospital: "City Hospital",
      },
      {
        name: "Bob Johnson",
        type: "Dermatologist",
        time: "4:30 PM",
        price: "$120",
        hospital: "Green Valley Clinic",
      },
    ];
    setAppointments(mockAppointments);

    // Mock data for previous appointments
    const mockPreviousAppointments = [
      {
        name: "Alice Cooper",
        type: "Orthopedic",
        time: "9:00 AM",
        price: "$200",
        hospital: "Orthopedic Center",
      },
      {
        name: "Michael Brown",
        type: "Ophthalmologist",
        time: "11:30 AM",
        price: "$90",
        hospital: "Eye Clinic",
      },
    ];
    setPreviousAppointments(mockPreviousAppointments);

    // Set a mock ongoing appointment
    setOngoingAppointment(mockAppointments[0]);
  }, []);

  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    setFeedback("");
    setShowConfirmation(true);

    // Hide confirmation and close modal after 2 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setShowFeedbackModal(false);
    }, 2000);
  };

  const handlePreviousAppointmentPress = (appointment: Appointment) => {
    // Open the feedback modal when a previous appointment is pressed
    setShowFeedbackModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardsContainer}>
          <View style={styles.greetingCard}>
            <Text style={styles.greetingText}>Hello {userName}! 👋</Text>
          </View>
          <TouchableOpacity
            style={styles.appointmentCard}
            onPress={() => setShowFeedbackModal(true)}
          >
            {ongoingAppointment ? (
              <>
                <Text style={styles.ongoingText}>Ongoing Appointment</Text>
                <Text style={styles.appointmentName}>
                  {ongoingAppointment.name}
                </Text>
                <Text style={styles.appointmentType}>
                  {ongoingAppointment.type}, {ongoingAppointment.hospital}
                </Text>
                <Text style={styles.appointmentTime}>
                  {ongoingAppointment.time}
                </Text>
              </>
            ) : (
              <Text style={styles.noAppointmentText}>
                No ongoing appointments
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.map((item, index) => (
          <AppointmentItem key={index} item={item} />
        ))}

        <Text style={styles.sectionTitle}>Previous Appointments</Text>
        {previousAppointments.map((item, index) => (
          <AppointmentItem
            key={index}
            item={item}
            onPress={() => handlePreviousAppointmentPress(item)}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFeedbackModal}
        onRequestClose={() => setShowFeedbackModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showConfirmation ? (
              <Text style={styles.confirmationText}>
                Submitted feedback! 🎉
              </Text>
            ) : (
              <>
                <Text style={styles.modalText}>Provide Feedback</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setFeedback}
                  value={feedback}
                  placeholder="Enter your feedback here"
                  multiline
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleFeedbackSubmit}
                >
                  <Text style={styles.buttonText}>Submit Feedback</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  greetingCard: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 15,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
  },
  greetingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ongoingText: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 5,
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  appointmentType: {
    fontSize: 14,
    color: "#8E8E93",
  },
  appointmentTime: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
  noAppointmentText: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    padding: 15,
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  appointmentInfo: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#007AFF",
  },
  type: {
    fontSize: 14,
    color: "#8E8E93",
  },
  timePrice: {
    marginRight: 15,
    alignItems: "flex-end",
  },
  time: {
    fontSize: 14,
    color: "#8E8E93",
  },
  price: {
    fontSize: 14,
    color: "#8E8E93",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 100,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#E5E5EA",
    textAlignVertical: "top",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CD964",
    textAlign: "center",
  },

  hospital: {
    fontSize: 12,
    color: "#4A4A4A",
    marginTop: 4,
    fontStyle: "italic",
  },
});
