class Map {
  constructor() {
    this.element = $('#mapContent');
    this.rows = [];
    this.tiles = [];
    this.sprites = [];
  }

  placeSprite(sprite) {
    const { row, column } = sprite.position;
    this.sprites[row][column] = sprite;
  }

  placeRow(row) {
    const rowElement = $("<div class='row'></div>");
    this.rows[row] = rowElement;
    this.element.append(rowElement);
  }

  placeTile(row, type) {
    const tileElement = $("<div class='tile'></div>");
    tileElement.addClass(type);
    this.rows[row].append(tileElement);
    if (!this.tiles[row]) {
      this.tiles[row] = [];
    }
    this.tiles[row].push(tileElement);
  }
}

let map;

function generateMap(mapData) {
  map = new Map();
  const mapArrayLength = mapData.map.length;

  for (let rowIndex = 0; rowIndex < mapArrayLength; rowIndex++) {
    // map.tiles.push([]); //map.tiles[rowIndex] = [];
    const rowArray = mapData.map[rowIndex];
    map.placeRow(rowIndex);
    for (let columnIndex = 0; columnIndex < rowArray.length; columnIndex++) {
      const tileType = rowArray[columnIndex];
      map.placeTile(rowIndex, tileType);
    }
  }
}

function initMap(callback) {
  $.ajax({
    url: "api/scenario/map.json"
  }).done(function (mapData) {

    generateMap(mapData)
    callback();
  });
}

function getTileOpacity(hero, tileRow, tileColumn) {

  const { row, column } = hero.position;
  // const row = hero.position.row
  // const column = hero.position.column

  const dinstance = Math.abs(tileRow - row) + Math.abs(tileColumn - column);
  const opacity = 1 - dinstance * 0.2;
  return opacity;
}

function updateMapOpacity(hero) {
  map.tiles.forEach((tileRow, row) => {
    tileRow.forEach((tile, column) => {
      tile.css({ opacity: getTileOpacity(hero, row, column) });
    });
  });
}
