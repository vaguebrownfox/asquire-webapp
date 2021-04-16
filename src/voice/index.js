const { anonymousTransform } = require("./anonymous");
const { trollTransform } = require("./troll");
const { underwaterTransform } = require("./underwater");

export const txDetes = [
	{
		name: "Anon",
		key: "anon",
		description: "Threaten someone?",
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
];
export const transforms = {
	anon: anonymousTransform,
	maelstrom: trollTransform,
	underwater: underwaterTransform,
};
