/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      return callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      return callback(
        Error(
          `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`
        ),
        null
      );
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, issResponse, body) => {
      if (error) return callback(error, null);

      if (issResponse.statusCode !== 200) {
        return callback(
          Error(
            `Status Code ${issResponse.statusCode} when fetching coordinates for IP: ${body}`
          ),
          null
        );
      }

      const { response } = JSON.parse(body);
      callback(null, response);
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
