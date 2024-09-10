import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledCard = styled(Card);

const ReportScreen: React.FC = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <StyledText className="text-2xl font-bold mb-5">Report</StyledText>

        <StyledView className="flex-row justify-between mb-5">
          <StyledCard className="w-1/3 p-4 rounded-xl bg-blue-200">
            <StyledView className="items-center">
              <StyledText className="text-lg mb-2">Heart Rate</StyledText>
              <StyledText className="text-3xl pt-5 font-bold">
                96{" "}
                <StyledText className="text-sm text-gray-500">bpm</StyledText>
              </StyledText>
              <IconButton icon="heart-pulse" size={20} className="mt-2" />
            </StyledView>
          </StyledCard>

          <StyledCard className="w-1/3 p-4 rounded-xl bg-red-200">
            <StyledView className="items-center">
              <StyledText className="text-lg mb-2">Blood Group</StyledText>
              <StyledText className="text-3xl font-bold">A+</StyledText>
              <IconButton icon="water" size={20} className="mt-2" />
            </StyledView>
          </StyledCard>

          <StyledCard className="w-1/3 p-4 rounded-xl bg-green-200">
            <StyledView className="items-center">
              <StyledText className="text-lg mb-2">Weight</StyledText>
              <StyledText className="text-3xl pt-5 font-bold">
                80 <StyledText className="text-sm text-gray-500">kg</StyledText>
              </StyledText>
              <IconButton icon="weight" size={20} className="mt-2" />
            </StyledView>
          </StyledCard>
        </StyledView>

        <StyledText className="text-xl font-bold mb-3">
          Latest Report
        </StyledText>

        <StyledView className="space-y-3">
          <StyledCard className="p-4 rounded-xl bg-purple-200">
            <StyledView className="flex-row justify-between items-center">
              <StyledView>
                <StyledText className="text-lg">Hospital A</StyledText>
                <StyledText className="text-sm text-gray-500">
                  Last updated: Sep 10, 2024
                </StyledText>
              </StyledView>
              <StyledText className="text-sm text-gray-500">5 files</StyledText>
              <IconButton icon="file-document" size={20} />
            </StyledView>
          </StyledCard>

          <StyledCard className="p-4 rounded-xl bg-pink-200">
            <StyledView className="flex-row justify-between items-center">
              <StyledView>
                <StyledText className="text-lg">Hospital B</StyledText>
                <StyledText className="text-sm text-gray-500">
                  Last updated: Sep 10, 2024
                </StyledText>
              </StyledView>
              <StyledText className="text-sm text-gray-500">8 files</StyledText>
              <IconButton icon="file-document" size={20} />
            </StyledView>
          </StyledCard>
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default ReportScreen;
