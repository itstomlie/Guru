import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ITypeInAnswerQuestion } from "@/interfaces/quiz";

interface TypeInAnswerQuestionProps {
  question: ITypeInAnswerQuestion;
  onAnswer: (id: string, answer: string) => void;
}

const TypeInAnswerQuestion: React.FC<TypeInAnswerQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAnswer(question.id, text.trim());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your answer here"
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
  },
});

export default TypeInAnswerQuestion;
