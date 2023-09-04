import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import MAINLOGO from "./../images/main_logo.png";
import { AppContext } from "../context";

export default function Quiz() {
  let navigate = useNavigate();
  const { info, setInfo } = useContext(AppContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (!info) {
      navigate("/");
    }
  }, [info, navigate]);
  const fetchQuestions = async () => {
    const resp = await axios.post("https://api.torstenmonth.com/index.php", {
      operation: "get_questions",
    });
    setQuestionData(resp.data);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerClick = (optionIndex) => {
    const qD = JSON.parse(JSON.stringify(questionData));
    qD.questions[currentQuestion].selected = optionIndex;
    setQuestionData(qD);
    if (qD.questions[currentQuestion].options[optionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleClick = (index) => {
    if (index === 9) {
      setInfo((prev) => {
        return { ...prev, score: score };
      });
      navigate("/score");
    } else {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questionData.questions.length) {
        setCurrentQuestion(nextQuestion);
      }
    }
  };
  if (info) {
    return (
      <div className="px-8">
        <div className="grid gap-12 grid-cols-2 items-center">
          <img src={MAINLOGO} alt="logo" />
          <div className="bg-primary p-1 grid grid-cols-2 items-center text-center rounded-md">
            <div className="text-white rounded-md font-semibold">Score: </div>
            <div className="bg-white rounded py-1">
              {score}/{questionData?.questions.length}
            </div>
          </div>
        </div>
        <div className="text-center space-y-3  mx-auto">
          <div className="flex justify-center">
            <div className="bg-primary h-8 w-8 rounded-full text-white font-medium flex justify-center items-center">
              {currentQuestion + 1}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="font-bold text-primary">
              {questionData?.questions[currentQuestion].question}
            </div>
          </div>
          <div className="container space-y-2 text-primary">
            {questionData?.questions[currentQuestion].options.map(
              (value, index) => {
                const selectedOptionIndex =
                  questionData?.questions[currentQuestion].selected;

                const selectedOption =
                  questionData?.questions[currentQuestion].options[
                    selectedOptionIndex
                  ];
                const option = ["A", "B", "C", "D", "E"];

                const optionIndex = index;
                return (
                  <div
                    className="relative w-full"
                    key={index}
                    onClick={() => handleAnswerClick(optionIndex)}
                    style={{
                      pointerEvents: selectedOptionIndex >= 0 ? "none" : " ",
                    }}
                  >
                    <p
                      className={`w-9 h-10 rounded-tl-lg rounded-bl-lg text-white p-2 absolute left-0 z-[1] flex items-center justify-center ${
                        selectedOptionIndex === index && !selectedOption.correct
                          ? "bg-red-500"
                          : selectedOptionIndex >= 0 && value.correct
                          ? "bg-green-500"
                          : "bg-primary"
                      }`}
                    >
                      {selectedOptionIndex === index &&
                      !selectedOption.correct ? (
                        <FaTimes />
                      ) : selectedOptionIndex >= 0 && value.correct ? (
                        <FaCheck />
                      ) : (
                        option[index]
                      )}
                    </p>
                    <p className="bg-white rounded-lg px-3 h-10 py-1 ml-8 relative z-[2] text-left shadow-lg leading-4 flex items-center text-sm">
                      {value.options}
                    </p>
                  </div>
                );
              }
            )}
            {questionData?.questions[currentQuestion].selected >= 0 ? (
              <button
                onClick={() => handleClick(currentQuestion)}
                className="bg-primary text-white btn"
              >
                {currentQuestion === 9 ? "Submit" : "Next"}
              </button>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    );
  }
}
