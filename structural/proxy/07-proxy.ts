/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../../helpers/colors.ts";

class Player {
  constructor(
    public name: string,
    public level: number,
  ) {}
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%c${player.name} has entered the secret room!`, COLORS.green);
  }
}

// clase proxy
class MagicDoor implements Room {
  constructor(private secretRoom: Room) {}

  enter(player: Player): void {

    if (player.level >= 10) {
      this.secretRoom.enter(player);

      return;
    }

    console.log(`%c${player.name} is not allowed to enter the secret room!`, COLORS.red);
  }
}

function main() {
    const secretRoom = new SecretRoom();
    const magicDoor = new MagicDoor(secretRoom);

    const player1 = new Player("Alice", 5);
    const player2 = new Player("Bob", 15);

    magicDoor.enter(player1); // Alice is not allowed to enter the secret room!
    magicDoor.enter(player2); // Bob has entered the secret room!

    

}

main();