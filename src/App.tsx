import { useEffect, useState } from "react";

import style from "./App.module.css";

import { Question } from "./models/question.model";

import { MainScreen } from "./components/MainScreen";
import { ProgressSidebar } from "./components/ProgressSidebar";

function App() {
	const [intro, setIntro] = useState<boolean>(true);
	const [question, setQuestion] = useState<Question[]>([]);
	const [answerPending, setAnswerPending] = useState<boolean>(false);
	const [questionCounter, setQuestionCounter] = useState<number>(0);
	const [correctId, setCorrectId] = useState<string>("");
	const [youAreWrong, setYouAreWrong] = useState<boolean>(false);
	const [questionOnScreen, setQuestionOnScreen] = useState<boolean>(false);
	const [lifelines, setLifelines] = useState<{
		[key: string]: { isUsed: boolean; styleClass: string };
	}>({
		"50:50": { isUsed: false, styleClass: "fifty-fifty-button" },
		"phone-friend": { isUsed: false, styleClass: "phone-friend-button" },
		"ask-audience": { isUsed: false, styleClass: "ask-audience-button" },
	});

	useEffect(() => {
		fetch("http://localhost:3000/question")
			.then((response) =>
				!response.ok ? console.log("bad request") : response.json()
			)
			.then((data) => {
				const modifiedData = data.questions.sort(
					(a: Question, b: Question) =>
						parseInt(a.content) - parseInt(b.content)
				);
				setQuestion(modifiedData);
				localStorage.setItem("questions", JSON.stringify(modifiedData));
			});
	}, []);
	//answers
	const onAnswerClicked = (event: React.BaseSyntheticEvent) => {
		setCorrectId(event.target.id);
	};
	console.log(question);
	const onConfirmAnswer = () => {
		const correctAnswer = question[questionCounter].answers.filter(
			(item) => item.isCorrect
		)[0];
		setAnswerPending(false);
		setQuestionOnScreen(false);
		setTimeout(() => setQuestionOnScreen(true), 2000);

		if (correctAnswer._id === correctId) {
			setTimeout(() => {
				question[questionCounter].isCurrentQuestion = false;
				question[questionCounter + 1].isCurrentQuestion = true;
				setQuestion([...question]);
				setQuestionCounter(questionCounter + 1);
			}, 2000);
		} else {
			setYouAreWrong(true);
			setQuestionCounter(0);
			setTimeout(() => {
				setLifelines({
					"50:50": { isUsed: false, styleClass: "fifty-fifty-button" },
					"phone-friend": { isUsed: false, styleClass: "phone-friend-button" },
					"ask-audience": { isUsed: false, styleClass: "ask-audience-button" },
				});
				question[questionCounter].isCurrentQuestion = false;
				question[0].isCurrentQuestion = true;
				setQuestion(() => {
					return JSON.parse(localStorage.getItem("questions")!);
				});
				setQuestionCounter(0);
				setYouAreWrong(false);
				setIntro(true);
			}, 2000);
		}
	};

	//lifelines
	const handleLifelineClick = (event: React.BaseSyntheticEvent) => {
		let counter = 0;
		switch (event.target.id) {
			case "50:50":
				lifelines["50:50"].isUsed = true;
				setLifelines({ ...lifelines });
				//not random solution(could do it by separating false answers in tempArr and then randomly returning a value,
				//saving the index from original array and setting them in tempArr[here])
				question[questionCounter].answers.forEach((answer, index) => {
					if (!answer.isCorrect && counter < 2) {
						counter++;
						question[questionCounter].answers[index].content = "";
					}
				});
				setQuestion([...question]);
				console.log("prvi");

				break;
			case "phone-friend":
				lifelines["phone-friend"].isUsed = true;
				setLifelines({ ...lifelines });
				console.log("drugi");

				break;
			case "ask-audience":
				lifelines["ask-audience"].isUsed = true;
				setLifelines({ ...lifelines });
				console.log("treci");
		}
	};

	return (
		<>
			<MainScreen
				style={style}
				intro={intro}
				question={question}
				answerPending={answerPending}
				questionCounter={questionCounter}
				correctId={correctId}
				youAreWrong={youAreWrong}
				questionOnScreen={questionOnScreen}
				lifelines={lifelines}
				setLifelines={setLifelines}
				setQuestionOnScreen={setQuestionOnScreen}
				setIntro={setIntro}
				onAnswerClicked={onAnswerClicked}
				setAnswerPending={setAnswerPending}
				onConfirmAnswer={onConfirmAnswer}
			/>
			<ProgressSidebar
				question={question}
				questionCounter={questionCounter}
				style={style}
				questionOnScreen={questionOnScreen}
				intro={intro}
				lifelines={lifelines}
				handleLifelineClick={handleLifelineClick}
			/>
		</>
	);
}

export default App;
