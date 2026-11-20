let startPosition = [0, 0];

const moves = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

function validPosition(position) {
  if (
    position[0] >= 0 &&
    position[0] <= 7 &&
    position[1] >= 0 &&
    position[1] <= 7
  )
    return true;
}

function checkIfReached(nextPosition, position) {
  if (nextPosition[0] === position[0] && nextPosition[1] === position[1]) {
    startPosition = position;
    return true;
  }
}

function move(position) {
  if (!validPosition(position)) return;

  const visited = new Set(); //to avoid visiting parent position
  visited.add("0,0");

  const parents = new Map(); //map for keeping ancestory
  parents.set("0,0", null);

  let nextMoves = [[0, 0]];

  while (nextMoves.length !== 0) {
    let currentPosition = nextMoves.shift();

    for (let i = 0; i <= 7; i++) {
      let nextPosition = [
        currentPosition[0] + moves[i][0],
        currentPosition[1] + moves[i][1],
      ];

      if (validPosition(nextPosition)) {
        console.log(nextPosition);

        const key = nextPosition.join(",");
        const parentKey = currentPosition.join(",");

        if (!visited.has(key)) {
          visited.add(key);
          parents.set(key, parentKey);

          if (checkIfReached(nextPosition, position)) {
            let current = nextPosition.join(",");
            let path = [];

            while (current !== null) {
              path.push(current);
              current = parents.get(current);
            }

            path.reverse();

            return path;
          }
          nextMoves.push(nextPosition);
        }
      }
    }
  }
}

console.log(move([0, 7]));
console.log(startPosition);
