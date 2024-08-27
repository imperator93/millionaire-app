import { Question } from "../models/question.model";

export const ProgressSidebar = (props: {
	style: CSSModuleClasses;
	question: Question[];
	questionCounter: number;
	questionOnScreen: boolean;
	intro: boolean;
	lifelines: { [key: string]: { isUsed: boolean; styleClass: string } };
	answerPending: boolean;
	youAreWrong: boolean;
	youAreCorrect: boolean;
	handleLifelineClick: (event: React.BaseSyntheticEvent) => void;
}) => {
	const moneyList = [
		"100 KN",
		"200 KN",
		"300 KN",
		"500 KN",
		"1000 KN",
		"2000 KN",
		"4 000 KN",
		"8 000 KN",
		"16 000 KN",
		"32 000 KN",
		"64 000 KN",
		"125 000 KN",
		"250 000 KN",
		"500 000 KN",
		"1 MILLION KN",
	];

	if (props.question.length === 0) {
		return <></>;
	}
	return (
		<div className={props.style["sidebar"]}>
			{Object.entries(props.lifelines).map(([key, value]) => (
				<button
					disabled={
						props.intro ||
						props.answerPending ||
						props.youAreWrong ||
						props.youAreCorrect ||
						key == (props.lifelines[key].isUsed && key)
					}
					onClick={(event) => props.handleLifelineClick(event)}
					key={key}
					id={key}
					//nemogu dodati više css klasa pod props.stlye[], ne radi iz nekog razloga
					className={
						props.style[
							`${
								props.lifelines[key].isUsed
									? `crossed-${value.styleClass}`
									: value.styleClass
							}`
						]
					}
				></button>
			))}

			<ol className={props.style["money-list"]} reversed>
				{moneyList.reverse().map((money, index) => (
					<li
						style={
							//fix when all 15 questions completed
							(parseInt(props.question[props.questionCounter].content) ==
								index + 1 && { backgroundColor: "Red" }) ||
							{}
						}
						key={index}
					>
						{money}
					</li>
				))}
			</ol>
		</div>
	);
};
