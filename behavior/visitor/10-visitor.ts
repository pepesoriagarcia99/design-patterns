/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rc: RollerCoaster): void;
  visitHauntedHouse(hh: HauntedHouse): void;
  visitFerrisWheel(fw: FerrisWheel): void;
}

interface Attraction {
  accept(v: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(v: Visitor): void {
    v.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(v: Visitor): void {
    v.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(v: Visitor): void {
    v.visitFerrisWheel(this);
  }
}

class childVisitor implements Visitor {
  visitRollerCoaster(rc: RollerCoaster): void {
    console.log(`NIÑO, precio: $${rc.getPrice() * 0.5}`);
  }
  visitHauntedHouse(hh: HauntedHouse): void {
    console.log(`NIÑO, precio: $${hh.getPrice() * 0.7}`);
  }
  visitFerrisWheel(fw: FerrisWheel): void {
    console.log(`NIÑO, precio: $${fw.getPrice() * 0.6}`);
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rc: RollerCoaster): void {
    console.log(`adulto, precio: $${rc.getPrice()}`);
  }
  visitHauntedHouse(hh: HauntedHouse): void {
    console.log(`adulto, precio: $${hh.getPrice()}`);
  }
  visitFerrisWheel(fw: FerrisWheel): void {
    console.log(`adulto, precio: $${fw.getPrice()}`);
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rc: RollerCoaster): void {
    console.log(`anciano, precio: $${rc.getPrice() * 0.85}`);
  }
  visitHauntedHouse(hh: HauntedHouse): void {
    console.log(`anciano, precio: $${hh.getPrice() * 0.85}`);
  }
  visitFerrisWheel(fw: FerrisWheel): void {
    console.log(`anciano, precio: $${fw.getPrice() * 0.85}`);
  }
}

function main() {
  const attractions = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  attractions.forEach((a) =>
    console.log(`${a.constructor.name} precio original: ${a.getPrice()}`),
  );

  const child1 = new childVisitor();
  attractions.forEach((a) => a.accept(child1));

  const adult1 = new AdultVisitor();
  attractions.forEach((a) => a.accept(adult1));

  const senior1 = new SeniorVisitor();
  attractions.forEach((a) => a.accept(senior1));
}

main();
