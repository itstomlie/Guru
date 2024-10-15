import quizzes from "@/constants/quizzes";
import {
  IQuiz,
  IQuestion,
  QuestionType,
  IFillInTheBlankQuestion,
  IMatchPairsQuestion,
  ISelectAnswersQuestion,
  ITypeInAnswerQuestion,
  IEssayQuestion,
  IMultipleChoiceQuestion,
} from "@/interfaces/quiz";

export class QuizService {
  private currentQuiz: IQuiz | null = null;
  private currentQuestionIndex: number = 0;

  /**
   * Fetches a quiz by the given videoId.
   * @param videoId - The ID of the video associated with the quiz.
   * @returns The quiz if found, otherwise null.
   */
  public getQuizByVideoId(videoId: string): IQuiz | null {
    const quiz = quizzes.find((q) => q.videoId === videoId) || null;
    this.currentQuiz = quiz;
    this.currentQuestionIndex = 0;
    return quiz;
  }

  /**
   * Retrieves the next question in the quiz.
   * @returns The next question or null if the quiz has ended.
   */
  public getNextQuestion(): IQuestion | null {
    if (!this.currentQuiz) {
      console.error("No quiz selected. Please load a quiz first.");
      return null;
    }

    if (this.currentQuestionIndex >= this.currentQuiz.questions.length) {
      console.log("Quiz completed.");
      return null;
    }

    const question = this.currentQuiz.questions[this.currentQuestionIndex];
    this.currentQuestionIndex += 1;
    return question;
  }

  /**
   * Starts the quiz flow.
   * Retrieves and handles each question in order.
   */
  public startQuiz(): void {
    if (!this.currentQuiz) {
      console.error("No quiz selected. Please load a quiz first.");
      return;
    }

    console.log(`Starting Quiz: ${this.currentQuiz.title}`);

    let question: IQuestion | null;

    while ((question = this.getNextQuestion()) !== null) {
      this.handleQuestion(question);
    }

    console.log("Quiz Finished.");
  }

  /**
   * Handles a question based on its type.
   * @param question - The question to handle.
   */
  private handleQuestion(question: IQuestion): void {
    switch (question.type) {
      case "multiple-choice":
        this.handleMultipleChoice(question);
        break;
      case "essay":
        this.handleEssay(question);
        break;
      case "fill-in-the-blank":
        this.handleFillInTheBlank(question);
        break;
      case "match-pairs":
        this.handleMatchPairs(question);
        break;
      case "type-in-answer":
        this.handleTypeInAnswer(question);
        break;
      case "select-answers":
        this.handleSelectAnswers(question);
        break;
      default:
        console.warn(`Unhandled question type`);
    }
  }

  /**
   * Handles multiple-choice questions.
   * @param question - The multiple-choice question.
   */
  private handleMultipleChoice(question: IMultipleChoiceQuestion): void {
    console.log(`Multiple Choice: ${question.question}`);
    question.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    // Implement user interaction logic here
    // e.g., capture user selection and validate
  }

  /**
   * Handles essay questions.
   * @param question - The essay question.
   */
  private handleEssay(question: IEssayQuestion): void {
    console.log(`Essay: ${question.question}`);
    // Implement user interaction logic here
    // e.g., capture user input for the essay
  }

  /**
   * Handles fill-in-the-blank questions.
   * @param question - The fill-in-the-blank question.
   */
  private handleFillInTheBlank(question: IFillInTheBlankQuestion): void {
    console.log(`Fill in the Blanks: ${question.question}`);
    // Implement user interaction logic here
    // e.g., capture user input for each blank
  }

  /**
   * Handles match-pairs questions.
   * @param question - The match-pairs question.
   */
  private handleMatchPairs(question: IMatchPairsQuestion): void {
    console.log(`Match Pairs: ${question.question}`);
    question.pairs.forEach((pair, index) => {
      console.log(`${index + 1}. ${pair.left} - ______`);
      // Display right options separately and implement matching logic
    });
    // Implement user interaction logic here
  }

  /**
   * Handles type-in-answer questions.
   * @param question - The type-in-answer question.
   */
  private handleTypeInAnswer(question: ITypeInAnswerQuestion): void {
    console.log(`Type in Answer: ${question.question}`);
    // Implement user interaction logic here
    // e.g., capture user input and validate against correctAnswer
  }

  /**
   * Handles select-answers questions.
   * @param question - The select-answers question.
   */
  private handleSelectAnswers(question: ISelectAnswersQuestion): void {
    console.log(`Select All That Apply: ${question.question}`);
    question.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    // Implement user interaction logic here
    // e.g., capture multiple selections and validate against correctAnswers
  }
}
