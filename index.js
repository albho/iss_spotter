const {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("207.216.141.1", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coordinates);
// });

// fetchISSFlyOverTimes(
//   { latitude: "49.27670", longitude: "-123.13000" },
//   (error, flyoverTimes) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log("It worked! Returned ISS flyover times:", flyoverTimes);
//   }
// );

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(pass.risetime * 1000).toLocaleDateString("en-US");
    console.log(`Next pass: ${datetime} => ${pass.duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});
