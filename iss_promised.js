const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = body => {
  const { ip } = JSON.parse(body);
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(pass.risetime * 1000).toLocaleDateString("en-US");
    console.log(`Next pass: ${datetime} => ${pass.duration} seconds`);
  }
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };
