import { useState } from "react";
import { Question } from "../models/question.model";

export const AskAudience = (props: {
	style: CSSModuleClasses;
	question: Question[];
	questionCounter: number;
	lifelines: { [key: string]: { isUsed: boolean; styleClass: string } };
	setLifelines: (_: typeof props.lifelines) => void;
}) => {
	const [timer, setTimer] = useState<number>(30);

	props.lifelines["ask-audience"].isUsed &&
		setTimeout(() => {
			if (timer != 0) setTimer(timer - 1);
		}, 1000);

	if (props.question.length === 0) {
		return <></>;
	}
	return (
		<>
			<div
				className={
					props.style[
						`${
							props.lifelines["ask-audience"].isUsed && timer >= 18
								? "ask-audience-icon"
								: "hidden"
						}`
					]
				}
			></div>
			<div
				className={
					props.style[
						`${
							props.lifelines["ask-audience"].isUsed && timer >= 18
								? "ask-audience-screen"
								: "hidden"
						}`
					]
				}
			>
				{props.question[props.questionCounter].answers.map((value, index) => (
					<div
						key={index * 15}
						style={{
							display: "flex",
							flexDirection: "column",
							flexWrap: "wrap",
							width: "15vw",
							height: "20vh",
							marginTop: "5vh",
							border: "2px solid white",
							borderRadius: "10px",
							padding: "2px",
						}}
					>
						<div style={{ width: "10em", height: "13em" }}>
							<div
								className={props.style["audience-results-color"]}
								//need to reverse this somehow
								style={{
									position: "absolute",
									width: "10em",
									bottom: "14vh",
									top: `${
										!props.question[props.questionCounter].answers[index]
											.isCorrect
											? "20vh"
											: "15vh"
									}`,
									margin: "6px",
								}}
								key={index}
							></div>
						</div>
						<div
							style={{
								zIndex: "5",
								width: "2vw",
								height: "1vh",
								margin: "5px",
								fontSize: "20px",
							}}
						>
							{value.content}
						</div>
					</div>
				))}
				<div className={props.style["timer-div"]}>{timer}</div>
			</div>
		</>
	);
};
