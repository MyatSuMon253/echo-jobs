import React from "react";
import { Text, View } from "react-native";

const ReviewScreen = () => {
  const navigationOptions = {
    title: "Review Jobs",
    header: () => {
      return {
        right: <Text>Go Right</Text>,
      };
    },
  };

  return (
    <View>
      <Text>ReviewScreen</Text>
    </View>
  );
};

export default ReviewScreen;
