const { anonymousTransform } = require("./anonymous");
const { trollTransform } = require("./troll");
const { underwaterTransform } = require("./underwater");

const txDetes = [
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

module.exports = {
	transforms: {
		anon: anonymousTransform,
		maelstrom: trollTransform,
		underwater: underwaterTransform,
	},
	txDetes,
};
