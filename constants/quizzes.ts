import { IQuiz } from "@/interfaces/quiz";

const quizzes: IQuiz[] = [
  {
    id: "quiz1",
    videoId: "5",
    title: "Language Proficiency Test",
    description: "A quiz to assess your language skills.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctOption: "Paris",
      },
      {
        id: "q2",
        type: "essay",
        question: "Describe your favorite book and why you like it.",
      },
      {
        id: "q3",
        type: "fill-in-the-blank",
        question: "The quick ___ fox jumps over the lazy dog.",
        blanks: 1,
        correctAnswers: ["brown"],
      },
      {
        id: "q4",
        type: "match-pairs",
        question: "Match the countries to their capitals.",
        pairs: [
          { left: "Italy", right: "Rome" },
          { left: "Spain", right: "Madrid" },
          { left: "Germany", right: "Berlin" },
        ],
      },
      {
        id: "q5",
        type: "type-in-answer",
        question: "Type the chemical symbol for water.",
        correctAnswer: "H2O",
      },
      {
        id: "q6",
        type: "select-answers",
        question: "Select all prime numbers.",
        options: ["2", "3", "4", "5"],
        correctAnswers: ["2", "3", "5"],
      },
    ],
  },
];

export default quizzes;
