import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  PanResponder,
} from "react-native";

export default function App() {
  const [quote, setQuote] = useState("");

  function getQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((responseJson) => {
        setQuote(responseJson.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Get quote on mount
  useEffect(() => getQuote(), []);

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        gestureState.dy > 150 ? getQuote() : null;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView {...panResponder.panHandlers}>
        <Text style={styles.header}>Random Quotes Every Time!</Text>
        <Text style={styles.body}>{quote}</Text>
        <StatusBar style="auto" />
        <Button title="Get New Quote" onPress={() => getQuote()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight + 100,
  },

  header: {
    fontSize: 30,
    marginBottom: 10,
  },

  body: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
