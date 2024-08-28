export type Question = {
	__v?: number;
	_id?: string;
	content: string;
	isCurrentQuestion: boolean;
	answers: Answers[];
};

export type Answers = {
	_id?: string;
	content: string;
	isCorrect: boolean;
};
