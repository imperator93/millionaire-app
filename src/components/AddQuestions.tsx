import { useState } from "react";

import { Question } from "../models/question.model";
import style from "./../App.module.css";
export const AddQuestions = ({ intro }: { intro: boolean }) => {
	const [addQuestion, setAddQuestion] = useState<boolean>(false);

	const handleSubmit = (event: React.BaseSyntheticEvent) => {
		const question: Question = {
			content: event.target[0].value,
			isCurrentQuestion: false,
			answers: [
				{ content: event.target[1].value, isCorrect: event.target[2].checked },
				{ content: event.target[3].value, isCorrect: event.target[4].checked },
				{ content: event.target[5].value, isCorrect: event.target[6].checked },
				{ content: event.target[7].value, isCorrect: event.target[8].checked },
			],
		};
		console.log(question);
		//form reset
		for (let i = 0; i <= 9; i++) {
			if (i < 2) event.target[i].value = "";
			else {
				i++;
				event.target[i].value = "";
			}
		}
	};

	return (
		<>
			{intro && !addQuestion && (
				<button
					onClick={() => setAddQuestion(!addQuestion)}
					className={style["add-questions-button"]}
				>
					Add Question
				</button>
			)}

			{addQuestion && (
				<div className={style["add-question-main-div"]}>
					<div className={style["add-question-div"]}>
						<button
							className={style["close-add-question-button"]}
							onClick={() => setAddQuestion(!addQuestion)}
						>
							X
						</button>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleSubmit(event);
							}}
							className={style["question-form"]}
						>
							<label>Enter question</label>
							<textarea
								style={{ flexBasis: "100%", resize: "none" }}
								required
								cols={30}
								rows={5}
								maxLength={100}
							/>

							<label>Answer 1</label>
							<input required />

							<div>
								<label>Is correct?</label>
								<input required type="radio" name="correct-answer" />
							</div>

							<label>Answer 2</label>
							<input required />

							<div>
								<label>Is correct?</label>
								<input type="radio" name="correct-answer" />
							</div>

							<label>Answer 3</label>
							<input required />

							<div>
								<label>Is correct?</label>
								<input type="radio" name="correct-answer" />
							</div>

							<label>Answer 4</label>
							<input required />

							<div>
								<label>Is correct?</label>
								<input type="radio" name="correct-answer" />
							</div>
							<button type="submit">Submit</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
