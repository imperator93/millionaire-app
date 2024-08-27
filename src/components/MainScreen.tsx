import { Question } from "../models/question.model";
import { AskAudience } from "./AskAudience";
import { PhoneFriendScreen } from "./PhoneFriendScreen";

export const MainScreen = (props: {
	style: CSSModuleClasses;
	intro: boolean;
	question: Question[];
	answerPending: boolean;
	questionCounter: number;
	correctId: string;
	youAreWrong: boolean;
	questionOnScreen: boolean;
	lifelines: { [key: string]: { isUsed: boolean; styleClass: string } };
	setLifelines: (_: typeof props.lifelines) => void;
	setQuestionOnScreen: (_: boolean) => void;
	setIntro: (_: boolean) => void;
	onAnswerClicked: (event: React.BaseSyntheticEvent) => void;
	setAnswerPending: (_: boolean) => void;
	onConfirmAnswer: () => void;
}) => {
	return (
		<>
			<h1>Millionaire</h1>
			<div
				className={
					(props.intro && props.style["mainDiv"]) || props.style["questionDiv"]
				}
			>
				<PhoneFriendScreen
					style={props.style}
					lifelines={props.lifelines}
				></PhoneFriendScreen>

				<AskAudience
					style={props.style}
					question={props.question}
					questionCounter={props.questionCounter}
					lifelines={props.lifelines}
					setLifelines={props.setLifelines}
				></AskAudience>

				{(props.intro && (
					<>
						<div className={props.style["intro-message"]}>
							Stisni play da igraš
						</div>
						<button
							className={props.style["playButton"]}
							onClick={() => {
								props.setQuestionOnScreen(true);
								props.setIntro(false);
							}}
						>
							Play
						</button>
					</>
				)) ||
					(props.questionOnScreen
						? props.question[props.questionCounter].content
						: !props.youAreWrong
						? "Bravo majmune"
						: "A jes glup")}
			</div>

			{!props.intro && (
				<div className={props.style["wrapper"]}>
					{props.question
						.filter((item) => item.isCurrentQuestion === true)
						.map((item) =>
							item.answers.map((item, index) => (
								<button
									disabled={
										!props.questionOnScreen ||
										props.question[props.questionCounter].answers[index]
											.content == ""
									}
									onClick={(event) => {
										props.onAnswerClicked(event);
										props.setAnswerPending(true);
									}}
									id={item._id}
									className={
										item._id !== props.correctId || !props.answerPending
											? props.style["question"]
											: props.style["questionPending"]
									}
									key={item._id}
								>
									{!props.intro && item.content}
								</button>
							))
						)}

					{props.answerPending && (
						<div className={props.style["areYouSure"]}>
							<h1
								style={{
									margin: "0",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								Are you sure?
							</h1>
							<button
								onClick={() => props.onConfirmAnswer()}
								className={props.style["areYouSureButton"]}
							>
								Yes
							</button>
							<button
								onClick={() => props.setAnswerPending(false)}
								className={props.style["areYouSureButton"]}
							>
								No
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
};
