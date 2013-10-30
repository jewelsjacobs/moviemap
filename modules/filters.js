var JSON2 = require('JSON2');

/**
 * Formats json string coordinates param
 * @param param
 * @returns {parse|*}
 */
exports.convertCoordinates = function(param) {
	var decodedString = decodeURIComponent(param);
	var coordinates = JSON2.parse(decodedString);
	coordinates["lat"] = (typeof coordinates["lat"] == "string") ? parseFloat(coordinates["lat"]) : coordinates["lat"];
	coordinates["lng"] = (typeof coordinates["lng"] == "string") ? parseFloat(coordinates["lng"]) : coordinates["lng"];
	return coordinates;
};
