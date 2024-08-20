import { useState } from "react";

export const PhoneFriendScreen = (props: {
	style: CSSModuleClasses;
	lifelines: { [key: string]: { isUsed: boolean; styleClass: string } };
}) => {
	const [timer, setTimer] = useState<number>(30);

	props.lifelines["phone-friend"].isUsed &&
		setTimeout(() => {
			if (timer != 0) setTimer(timer - 1);
		}, 1000);
	return (
		<div
			className={
				props.lifelines["phone-friend"].isUsed && timer >= 18
					? props.style["phone-friend-screen"]
					: props.style["hidden"]
			}
		>
			<div
				style={{
					height: "30vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					lineHeight: "7vh",
				}}
			>
				Neko zove <br />
				{timer}
			</div>
		</div>
	);
};
