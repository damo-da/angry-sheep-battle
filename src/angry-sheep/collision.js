import C from './constants';

function sleep(ms) {
  const start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
}

export function collide(player1, player2) {
  const rows = _.range(C.ROWS).map((x) => {
    return player1.sheep.filter(s => s.row == x).map(s => {s.side = 1; return s;})
      .concat(
        player2.sheep.filter(s => s.row == x).map(s => {s.side = -1; return s;})
      )
      .sort((x,y) => x.col - y.col);
  });

  rows.forEach(sheepArray => {
    const result = sheepArray.reduce((groups, singleSheep) => {
      let groupFound = false;

      groups.forEach(group => {
        group.forEach(groupSheep => {
          if (groupFound)return;

          const collision = (Math.abs(groupSheep.col - singleSheep.col) <= (groupSheep.width + singleSheep.width) / 2.0);
          if (collision) {
            groupFound = true;
            group.push(singleSheep);
          }
        });



      });

      if (!groupFound) {
        groups.push([singleSheep]);
      }
      return groups;

    }, []);

    result.forEach(group => {
      const groupSpeed = group.reduce((acc, x) => acc + x.side * x.strength, 0) / (1 + group.length/10);

      group.forEach(singleSheep => {singleSheep.speed = groupSpeed; });

    });

  });


}
