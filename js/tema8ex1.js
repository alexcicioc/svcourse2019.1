
// Clasa triunghi reprezinta un triunghi oarecare
// Daca alta clasa extinde Triunghi inseamna ca e un tip mai specific de triunghi
// gen echilateral, isoscel
class Triunghi {
    constructor(l1, l2, l3, type = 'oarecare') { // type daca nu e trimis in constructor va fi oarecare
        // In constructor imi definesc proprietatile obiectului de tip 'Triunghi'
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
        this.type = type;
    }

    calculPerimetru() {
        return this.l1 + this.l2 + this.l3;
    }

    calculArie() {
        const sp = (this.l1 + this.l2 + this.l3) / 2;
        const arie = Math.sqrt(sp * (sp - this.l1) * (sp - this.l2) * (sp - this.l3)).toFixed(2);
        return arie;
    }

    arataMesaj() {
        console.log(this.calculPerimetru());
        return `Triunghiul este de tip ${this.type};
        perimetru=${this.calculPerimetru()};
        arie=${this.calculArie()}`;
    }
}

class Isoscel extends Triunghi {
    constructor(l1, l2, l3) {
        super(l1, l2, l3, 'isoscel');
    }
}

class Echilateral extends Triunghi {
    // nu am nevoie de 3 laturi aici in constructor daca toate sunt egale
    constructor(latura) {
        super(latura, latura, latura, 'echilateral');
    }

    // formula specifica de calcul la echilateral
    calculArie() {
        console.log('aici am suprascris functia calculArie al parintelui');
        return this.l1 * this.l1 * Math.sqrt(3) / 4;
    }

    // formula specifica de calcul perimetru la echilateral
    calculPerimetru() {
        console.log('aici am suprascris functia calculPerimetru al parintelui');
        return this.l1 * 3;
    }
}

// O functie care determina tipul si imi creeaza triunghiul potrivit in functie de laturi
function makeTriunghi(l1, l2, l3) {
    if (l1 === l2 && l2 === l3) { // daca toate 3 sunt egale
        return new Echilateral(l1);
    } else if (l1 === l2 || l2 === l3) { // daca oricare 2 laturi sunt egale (daca sunt toate 3 se opreste la primul if)
        return new Isoscel(l1, l2, l3);
    } else {
        return new Triunghi(l1, l2, l3); // altfel e triunghi oarecare
    }
}

$("#button").click(function () {

    const l1 = Number($("#l1").val()); // ma asigur ca valoarea e ori intreaga ori zecimala
    const l2 = Number($("#l2").val());
    const l3 = Number($("#l3").val());

    const triunghi = makeTriunghi(l1, l2, l3);
    $('body').append(`<p>${triunghi.arataMesaj()}</p>`);
});
