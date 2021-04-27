const { anonymousTransform } = require("./anonymous");
const { trollTransform } = require("./troll");
const { underwaterTransform } = require("./underwater");
const { reverseTimeTransform } = require("./reverseTime");

export const txDetes = [
	{
		name: "Anonymous",
		key: "anon",
		description: "Distorted voice",
	},
	{
		name: "Maelstrom",
		key: "maelstrom",
		description: "Maelstrom Gang",
	},
	{
		name: "Underwater",
		key: "underwater",
		description: "Talking under water",
	},
	{
		name: "Reverse",
		key: "reverse",
		description: "Do you speak in reverse?",
	},
];
export const transforms = {
	anon: anonymousTransform,
	maelstrom: trollTransform,
	underwater: underwaterTransform,
	reverse: reverseTimeTransform,
};
