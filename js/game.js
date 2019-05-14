initMap(generateSprites);

function updateCoordinates(direction, step) {
  let coordinateName;

  if (direction === 'top') {
    coordinateName = 'row';
  } else {
    coordinateName = 'column';
  }

  hero.position[coordinateName] += step;

  $("#" + coordinateName).text(hero.position[coordinateName]);

  checkTileActions();
}

const test = function () {
  this.test = 'myvar';
  console.log(this);
}

console.log(new test());


