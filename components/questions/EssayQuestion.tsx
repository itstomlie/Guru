import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { IEssayQuestion } from "@/interfaces/quiz";

interface EssayQuestionProps {
  question: IEssayQuestion;
  onAnswer: (id: string, answer: string) => void;
}

const EssayQuestion: React.FC<EssayQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAnswer(question.id, text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your answer here"
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={text.trim() === ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "#000",
    height: 100,
    textAlignVertical: "top",
  },
});

export default EssayQuestion;
