class Sprite {
  constructor(type, position, stats, id) {
    this.position = position;
    this.stats = stats;
    this.id = id;
    this.type = type;
    this.element = this.createElement();
    // this = context
  }

  createElement() {
    const element = $('<div></div>');
    element.addClass('sprite');
    element.addClass(this.type);
    element.attr('id', this.id);
    return element;
  }

  static makeSprite(type, position, stats, id) {
    switch (type) {
      case 'hero':
        return new Hero(position, stats, id);
      case 'vilain':
        return new Monster(type, position, stats, id);
      case 'bat':
        return new Monster(type, position, stats, id);
      case 'health-potion':
        return new Sprite(type, position, stats, id);
      case 'chest-closed':
        return new Sprite(type, position, stats, id);
    }
  }
}

class Character extends Sprite {
  constructor(type, position, stats, id) {
    super(type, position, stats, id);
    this.createHpBar();
  }

  createHpBar() {
    const hpBar = $('<div></div>');
    hpBar.addClass('hp-bar');
    hpBar.text(this.stats.healingPoints + '/' + this.stats.vitality);
    const hpPercentage = this.stats.healingPoints * 100 / this.stats.vitality;
    const fullPercentage = 100 - hpPercentage;
    hpBar.css({
      background: `linear-gradient(90deg, rgba(255, 0, 43, 0.5) ${hpPercentage}%, rgba(0, 255, 255, 0) ${fullPercentage}%)`
    });

    this.element.html(hpBar);
  }
}

class Hero extends Character {
  constructor(position, stats, id) {
    super('hero', position, stats, id);
  }

  updateStats() {
    $('#strength').text(this.stats.strength);
    $('#vitality').text(this.stats.healingPoints + '/' + this.stats.vitality);
    this.createHpBar();
  }
}

class Monster extends Character {
  constructor(type, position, stats, id) {
    super(type, position, stats, id);
  }
}

// // const sprite = new Sprite(position, stats, element);
// const character = new Character(
//   'hero',
//   { row: 0, column: 5 },
//   {
//     strength: 10,
//     vitality: 20,
//     healingPoints: 20
//   },
//   $('#adventurer')
// );

// console.log(character);
