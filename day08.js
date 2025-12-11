const fs = require("node:fs");

fs.readFile("./day08.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const coords = data
    .split("\n")
    .map((input) => input.split(","))
    .map((arr) => ({
      x: arr[0],
      y: arr[1],
      z: arr[2],
    }));

  // coords.forEach((coord) => console.log(coord));s

  const getDistance = (coord1, coord2) => {
    // console.log(coord1, coord2);
    return Math.sqrt(
      (coord2.x - coord1.x) ** 2 +
        (coord2.y - coord1.y) ** 2 +
        (coord2.z - coord1.z) ** 2
    );
  };

  // map of coord pair -> distance
  // e.g. 431,825,988|425,690,689 -> distance
  let distances = {};
  const coordStrs = data.split("\n");

  for (let i = 0; i < coordStrs.length; i++) {
    for (let j = i + 1; j < coordStrs.length; j++) {
      const combinedStr = coordStrs[i] + "|" + coordStrs[j];
      distances[combinedStr] = getDistance(coords[i], coords[j]);
    }
  }
  // console.log(distances);

  let sortedDistances = Object.keys(distances).sort(
    (pair1, pair2) => distances[pair2] - distances[pair1]
  );
  // console.log(sortedDistances);

  let circuits = [];
  let coordToCircuitIndex = {};

  let conn = 0;
  const numConnections = 1000;
  // while (conn < numConnections) {
  //   const shortestPair = sortedDistances.pop();
  //   const coord1 = shortestPair.substring(0, shortestPair.indexOf("|"));
  //   const coord2 = shortestPair.substring(shortestPair.indexOf("|") + 1);
  //   // console.log(conn, "checking pair", shortestPair);

  //   const coord1Index = coordToCircuitIndex[coord1];
  //   const coord2Index = coordToCircuitIndex[coord2];
  //   conn++;

  //   // both in same circuit -> skip
  //   if (
  //     coord1Index !== undefined &&
  //     coord2Index !== undefined &&
  //     coord1Index === coord2Index
  //   ) {
  //     // console.log("same circuit, skip");
  //   } else {
  //     // neither in circuit -> new circuit
  //     if (coord1Index === undefined && coord2Index === undefined) {
  //       const circuit = [coord1, coord2];
  //       circuits.push(circuit);
  //       const circuitIndex = circuits.length - 1;
  //       coordToCircuitIndex[coord1] = circuitIndex;
  //       coordToCircuitIndex[coord2] = circuitIndex;
  //       // console.log("new circuit");
  //     }
  //     // 1 in circuit, 2 not in circuit -> add 2 to 1's circuit
  //     else if (coord1Index !== undefined && coord2Index === undefined) {
  //       circuits[coord1Index].push(coord2);
  //       coordToCircuitIndex[coord2] = coord1Index;
  //       // console.log("add 2 to 1");
  //     }
  //     // 2 in circuit, 1 not in circuit -> add 1 to 2's circuit
  //     else if (coord2Index !== undefined && coord1Index === undefined) {
  //       circuits[coord2Index].push(coord1);
  //       coordToCircuitIndex[coord1] = coord2Index;
  //       // console.log("add 1 to 2");
  //     }
  //     // both in circuit, but not same -> combine into 1's circuit
  //     else if (coord1Index !== coord2Index) {
  //       circuits[coord2Index].forEach((coord) => {
  //         circuits[coord1Index].push(coord);
  //         coordToCircuitIndex[coord] = coord1Index;
  //       });
  //       circuits[coord2Index] = null;
  //       // console.log("merged");
  //     }
  //   }
  //   // circuits.forEach((circuit) => console.log(circuit));
  // }

  // circuits = circuits.filter((circuit) => circuit !== null);
  // circuits.sort((circuit1, circuit2) => circuit2.length - circuit1.length);

  // const sizesProduct = circuits
  //   .slice(0, 3)
  //   .map((circuit) => circuit.length)
  //   .reduce((acc, curr) => (acc *= curr), 1);
  // console.log({ sizesProduct });

  // PART 2
  let shortestPair = null;
  let longestCircuitLength = 0;
  while (longestCircuitLength < coordStrs.length) {
    console.log(longestCircuitLength);
    conn++;
    shortestPair = sortedDistances.pop();
    const coord1 = shortestPair.substring(0, shortestPair.indexOf("|"));
    const coord2 = shortestPair.substring(shortestPair.indexOf("|") + 1);
    // console.log(conn, "checking pair", shortestPair);

    const coord1Index = coordToCircuitIndex[coord1];
    const coord2Index = coordToCircuitIndex[coord2];

    // both in same circuit -> skip
    if (
      coord1Index !== undefined &&
      coord2Index !== undefined &&
      coord1Index === coord2Index
    ) {
      // console.log("same circuit, skip");
    } else {
      // neither in circuit -> new circuit
      if (coord1Index === undefined && coord2Index === undefined) {
        const circuit = [coord1, coord2];
        circuits.push(circuit);
        const circuitIndex = circuits.length - 1;
        coordToCircuitIndex[coord1] = circuitIndex;
        coordToCircuitIndex[coord2] = circuitIndex;
        longestCircuitLength = Math.max(longestCircuitLength, circuit.length);
        // console.log("new circuit");
      }
      // 1 in circuit, 2 not in circuit -> add 2 to 1's circuit
      else if (coord1Index !== undefined && coord2Index === undefined) {
        circuits[coord1Index].push(coord2);
        coordToCircuitIndex[coord2] = coord1Index;
        longestCircuitLength = Math.max(
          longestCircuitLength,
          circuits[coord1Index].length
        );

        // console.log("add 2 to 1");
      }
      // 2 in circuit, 1 not in circuit -> add 1 to 2's circuit
      else if (coord2Index !== undefined && coord1Index === undefined) {
        circuits[coord2Index].push(coord1);
        coordToCircuitIndex[coord1] = coord2Index;
        longestCircuitLength = Math.max(
          longestCircuitLength,
          circuits[coord2Index].length
        );
        // console.log("add 1 to 2");
      }
      // both in circuit, but not same -> combine into 1's circuit
      else if (coord1Index !== coord2Index) {
        circuits[coord2Index].forEach((coord) => {
          circuits[coord1Index].push(coord);
          coordToCircuitIndex[coord] = coord1Index;
        });
        circuits[coord2Index] = null;
        longestCircuitLength = Math.max(
          longestCircuitLength,
          circuits[coord1Index].length
        );
        // console.log("merged");
      }
    }
    // circuits.forEach((circuit) => console.log(circuit));
  }

  console.log(shortestPair);
});
