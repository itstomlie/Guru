import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import quizzes from "@/constants/quizzes";
import { IQuiz, IQuestion } from "@/interfaces/quiz";
import MultipleChoiceQuestion from "@/components/questions/MultipleChoiceQuestion";
import EssayQuestion from "@/components/questions/EssayQuestion";
import FillInTheBlankQuestion from "@/components/questions/FillInTheBlankQuestion";
import MatchPairsQuestion from "@/components/questions/MatchPairsQuestion";
import TypeInAnswerQuestion from "@/components/questions/TypeInAnswerQuestion";
import SelectAnswersQuestion from "@/components/questions/SelectAnswersQuestion";

const QuizScreen = () => {
  const router = useRouter();
  const { videoId } = useLocalSearchParams();
  console.log("🚀 ~ QuizScreen ~ videoId:", videoId);
  const handleClose = () => {
    router.back();
  };

  // Find the quiz with the matching videoId
  const quiz: IQuiz | undefined = quizzes.find((q) => q.videoId === videoId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.quizText}>Quiz not found.</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion: IQuestion = quiz.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, handle submission
      // For example, navigate to a results screen
      router.push("/quiz/results");
    }
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    handleNext();
  };

  return (
    <View style={styles.container}>
      {/* Header with Close Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Text style={styles.description}>{quiz.description}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <Progress
        value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
        size="md"
      >
        <ProgressFilledTrack className="bg-blue-400" />
      </Progress>

      {/* Quiz Question */}
      <ScrollView contentContainerStyle={styles.quizContentContainer}>
        <Text style={styles.quizText}>{currentQuestion.question}</Text>
        <QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} />
      </ScrollView>
    </View>
  );
};

export default QuizScreen;

// Function to render specific question types
interface QuestionRendererProps {
  question: IQuestion;
  onAnswer: (id: string, answer: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onAnswer,
}) => {
  switch (question.type) {
    case "multiple-choice":
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
    case "essay":
      return <EssayQuestion question={question} onAnswer={onAnswer} />;
    case "fill-in-the-blank":
      return <FillInTheBlankQuestion question={question} onAnswer={onAnswer} />;
    case "match-pairs":
      return <MatchPairsQuestion question={question} onAnswer={onAnswer} />;
    case "type-in-answer":
      return <TypeInAnswerQuestion question={question} onAnswer={onAnswer} />;
    case "select-answers":
      return <SelectAnswersQuestion question={question} onAnswer={onAnswer} />;
    default:
      return <Text style={styles.quizText}>Unsupported question type.</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000CC",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  },
  progressBarContainer: {
    marginBottom: 30,
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#555",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "20%", // 1 out of 5
    height: "100%",
    backgroundColor: "#fff",
  },
  progressText: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  quizContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20, // Optional: Add vertical padding if needed
  },
  quizText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 10,
  },
});
