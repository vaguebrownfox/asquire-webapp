const { anonymousTransform } = require("./anonymous");
const { trollTransform } = require("./troll");

module.exports = {
	anon: anonymousTransform,
	troll: trollTransform,
};
