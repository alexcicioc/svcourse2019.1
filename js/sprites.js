let hero = {};

function generateSprites() {
  $.ajax({
    url: "api/scenario/sprites.json"
  }).done(function (spritesData) {
    spritesData.forEach(function (sprite, spriteIndex) {
      const row = sprite.position[0];
      const column = sprite.position[1];
      if (map.sprites[row] === undefined) {
        map.sprites[row] = [];
      }

      spritePosition = { row, column };
      sprite = Sprite.makeSprite(
        sprite.type, spritePosition, sprite.stats, sprite.id
      );
      map.sprites[row][column] = sprite;

      if (sprite.type === 'hero') {
        hero = sprite;

        $('#row').text(row);
        $('#column').text(column);
        hero.updateStats();
        updateMapOpacity(hero);
        $('body').prepend(hero.element);
        const { top, left } = map.tiles[0][5][0].getBoundingClientRect();
        $('#adventurer').css({ top, left });
        // {left: left, top: top}
      } else {
        map.tiles[row][column].append(sprite.element);
      }
    })
    showNextDialogIfAvailable(hero.position.row, hero.position.column);
  });
}
