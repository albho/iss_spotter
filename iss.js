const request = require("request");

const fetchMyIP = function (callback) {
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
    (error, response, body) => {
      if (error) return callback(error, null);

      if (response.statusCode !== 200) {
        return callback(
          Error(
            `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`
          ),
          null
        );
      }

      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
