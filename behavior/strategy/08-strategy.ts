/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move() {
    console.log("El pato nada sobre el agua\n");
  }
}

class FlyOverWater implements MovementStrategy {
  move() {
    console.log("El pato vuela sobre el agua\n");
  }
}

class WalkClumsily implements MovementStrategy {
  move() {
    console.log("El pato camina\n");
  }
}

class Duck {
  constructor(
    private name: string,
    private movementStrategy: MovementStrategy,
  ) {
    console.log(`el pato ${name}, listo para competir`);
  }

  performMove() {
    console.log(`${this.name} se prepara para moverse`);
    this.movementStrategy.move();
  }

  setMovementStrategy(s: MovementStrategy){
    this.movementStrategy = s;
    console.log(`${this.name} cambio de estrategia`)
  }
}

function main() {
    const duck1 = new Duck('paco', new FlyOverWater());
    const duck2 = new Duck('manolito', new SwimFast())

    duck1.performMove()
    duck2.performMove()

    duck2.setMovementStrategy(new FlyOverWater())
    duck2.performMove()
}

main();
