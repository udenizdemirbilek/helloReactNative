import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  PanResponder,
} from "react-native";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);

  function getQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((responseJson) => {
        setQuote(responseJson.content);
        setAuthor(responseJson.author);
        setTags(responseJson.tags);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Get quote on mount
  useEffect(() => getQuote(), []);

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderRelease: (evt, gestureState) =>
        gestureState.dy > 150 ? getQuote() : null,
    })
  ).current;

  return (
    <ScrollView {...panResponder.panHandlers} style={styles.container}>
      <StatusBar backgroundColor="#687089" />
      <View style={styles.view}>
        <Text style={styles.header}>Random Quote</Text>
        <View style={styles.quote}>
          <Text style={styles.body}>{quote}</Text>
          <Text style={styles.body}>- {author}</Text>
        </View>
        <View style={styles.tag}>
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton}>
              <Text style={styles.tagsText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => getQuote()}>
        <Text style={styles.buttonText}>Bring me a new quote</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#eff1f8",
  },

  header: {
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#d6dcd2",
    marginBottom: 10,
    backgroundColor: "#687089",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#eff1f8",
  },

  view: {
    display: "flex",
    backgroundColor: "#767c96",
    height: 400,
  },

  quote: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },

  body: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d6dcd2",
    textAlign: "center",
    marginTop: 20,
  },

  tag: {
    marginTop: 50,
    height: 80,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },

  tagButton: {
    backgroundColor: "#959aad",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    elevation: 20,
  },

  tagsText: {
    color: "#e9eaed",
  },

  button: {
    backgroundColor: "#687089",
    margin: 20,
    borderRadius: 30,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#d6dcd2",
    fontSize: 16,
    fontWeight: "bold",
  },
});
