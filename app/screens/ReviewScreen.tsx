import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

const ReviewScreen = () => {
  const navigationOptions = {
    title: "Review Jobs",
    header: ({navigate}: {navigate: any}) => {
      return {
        right: <Button title="Settings" onPress={() => {navigate('settings')}} />,
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
