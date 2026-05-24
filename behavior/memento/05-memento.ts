/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

abstract class BaseGame {
  constructor(
    protected level: number,
    protected health: number,
    protected position: string,
  ) {}

  protected state(): void {
    console.log(`Jugador:
        *nivel: ${this.getLevel()}
         *salud: ${this.getHealth()}
         *posicion: ${this.getPosition()}
    `);
  }

  public getLevel() {
    return this.level;
  }

  public getHealth() {
    return this.health;
  }

  public getPosition() {
    return this.position;
  }
}

class GameMemento extends BaseGame {}

class Game extends BaseGame {
  constructor(
    level: number = 1,
    health: number = 100,
    position: string = "inicio",
  ) {
    super(level, health, position)
    this.state();
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    this.state();
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    this.state();
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(m: GameMemento) {
    this.mementos.push(m);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game();

  const history = new GameHistory();

  history.push(game.save());

  // jugador avanza
  game.play(2, 90, "Bosque encantando");
  history.push(game.save());

  game.play(3, 70, "cueva");
  history.push(game.save());

  game.play(4, 50, "castillo");
  console.log("Estado actual");

  game.restore(history.pop()!);
}

main();
