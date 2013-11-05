var JSON3 = require('json3');

exports.new_york = function(){
  var new_york_mock_response = {
    "city": {
      "mid": "/m/02_286",
      "id": "/en/new_york",
      "name": "New York City",
      "notable": {
        "name": "City/Town/Village",
        "id": "/location/citytown"
      },
      "lang": "en",
      "score": 39.065792
    },
    "country": {
      "id": "/en/united_states",
      "name": "United States of America"
    },
    "province": {
      "id": "/en/new_york_state",
      "name": "New York"
    },
    "timezone": null
  };

  return JSON3.stringify(new_york_mock_response);
}
