import { View, Text, Button, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Loading from './components/Loading';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { trigger } from "react-native-haptic-feedback";
import Markdown from 'react-native-markdown-display';
import { API_KEY } from '../secret';


const ChatScreen = () => {

  const [result, setResult] = useState('Hey whats up!')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };


  function handleClick() {
    console.log('Button Clicked')
    if (input !== "") {
      setIsLoading(true)
      const genAI = new GoogleGenerativeAI(API_KEY);

      async function run() {

        try {
          setInput('')
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = input; // use the input value as the prompt
          const result = await model.generateContent(prompt);
          if (result) {
            const response = await result.response;
            const text = response.text();
            setIsLoading(false)
            setResult(text)
            trigger("impactHeavy", options);
            console.log(text);
          } else {
            setResult('something went wrong')
          }
        } catch (error) {
          console.log(error)
        }
      }
      run();
    } else {
      setResult('Kindly add prompt')
    }
  }
  const markdownStyles = {
    text: {
      color: 'white',
      fontSize: 20,
      marginTop: 10,
    },
    // Add more styles for other Markdown elements if needed
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{ color: '#009688', fontSize: 20, marginTop: 10 }}> AI : </Text> */}
      {isLoading ? <Loading /> :


        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.markdownContainer}>

            <Markdown style={markdownStyles}>{result}</Markdown>

          </View>
        </ScrollView>





      }
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInput(text)}
          value={input}
          multiline={true}
          placeholder="What's in your mind..."
          placeholderTextColor={'gray'}
          autoFocus={true}
        />

        <Pressable style={styles.buttonContainer} onPress={handleClick}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 15
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  markdownContainer: {
    flex: 1,
    padding: 10,
  },
  rplytxt: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    // Ensure that the text wraps within its container
    flexWrap: 'wrap',
  },
  inputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 5
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    color: 'white',
    width: '70%',
    borderRadius: 10,
    fontSize: 20
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    height: 55,
    width: '20%'
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

