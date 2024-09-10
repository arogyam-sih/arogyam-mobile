import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Mock data - replace with actual data fetching logic
const mockData = {
  prescriptions: [
    {
      id: 1,
      hospital: "City Hospital",
      date: "2023-09-01",
      details: "Prescription for antibiotics",
    },
    {
      id: 2,
      hospital: "Central Clinic",
      date: "2023-08-15",
      details: "Prescription for fever",
    },
    {
      id: 3,
      hospital: "Central Clinic",
      date: "2023-08-15",
      details: "Prescription for pain relief",
    },
  ],
  diagnosis: [
    {
      id: 1,
      hospital: "City Hospital",
      date: "2023-09-01",
      details: "Diagnosis: Common cold",
    },
    {
      id: 2,
      hospital: "State Medical Center",
      date: "2023-07-20",
      details: "Diagnosis: Fever",
    },

    {
      id: 3,
      hospital: "State Medical Center",
      date: "2023-07-20",
      details: "Diagnosis: Sprained ankle",
    },
  ],
  scans: [
    {
      id: 1,
      hospital: "Central Clinic",
      date: "2023-08-15",
      details: "X-ray scan of chest",
    },
    {
      id: 2,
      hospital: "State Medical Center",
      date: "2023-07-20",
      details: "MRI scan of knee",
    },
  ],
};

type ReportCategory = "prescriptions" | "diagnosis" | "scans";

const ReportItem: React.FC<{ item: any }> = ({ item }) => (
  <View className="bg-gray-100 p-3 rounded-lg mb-2">
    <Text className="font-bold">{item.hospital}</Text>
    <Text className="text-gray-600 mb-1">{item.date}</Text>
    <Text>{item.details}</Text>
  </View>
);

const Reports: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<ReportCategory>("prescriptions");
  const [reports, setReports] = useState(mockData);

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  if (!isReady) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  const renderReports = () => {
    const categoryData = reports[activeCategory];
    const groupedByHospital = categoryData.reduce((acc, item) => {
      if (!acc[item.hospital]) {
        acc[item.hospital] = [];
      }
      acc[item.hospital].push(item);
      return acc;
    }, {});

    return Object.entries(groupedByHospital).map(([hospital, items]) => (
      <View key={hospital} className="mb-4">
        <Text className="text-lg font-bold mb-2">{hospital}</Text>
        {items.map((item) => (
          <ReportItem key={item.id} item={item} />
        ))}
      </View>
    ));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Reports</Text>

        {/* Biometrics Section */}
        <View className="flex-row justify-between mb-6">
          <View className="items-center">
            <FontAwesome name="heartbeat" size={24} color="red" />
            <Text className="mt-2">Heart Rate</Text>
            <Text className="font-bold">75 bpm</Text>
          </View>
          <View className="items-center">
            <FontAwesome name="tint" size={24} color="blue" />
            <Text className="mt-2">Blood Pressure</Text>
            <Text className="font-bold">120/80</Text>
          </View>
          <View className="items-center">
            <FontAwesome name="balance-scale" size={24} color="green" />
            <Text className="mt-2">Weight</Text>
            <Text className="font-bold">70 kg</Text>
          </View>
        </View>

        <Text className="text-xl font-bold mb-4">Latest Reports</Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeCategory === "prescriptions" ? "bg-blue-500" : "bg-gray-300"}`}
            onPress={() => setActiveCategory("prescriptions")}
          >
            <Text
              className={`font-bold ${activeCategory === "prescriptions" ? "text-white" : "text-black"}`}
            >
              Prescriptions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeCategory === "diagnosis" ? "bg-blue-500" : "bg-gray-300"}`}
            onPress={() => setActiveCategory("diagnosis")}
          >
            <Text
              className={`font-bold ${activeCategory === "diagnosis" ? "text-white" : "text-black"}`}
            >
              Diagnosis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeCategory === "scans" ? "bg-blue-500" : "bg-gray-300"}`}
            onPress={() => setActiveCategory("scans")}
          >
            <Text
              className={`font-bold ${activeCategory === "scans" ? "text-white" : "text-black"}`}
            >
              Scans
            </Text>
          </TouchableOpacity>
        </View>
        {renderReports()}
      </View>
    </ScrollView>
  );
};

export default Reports;

