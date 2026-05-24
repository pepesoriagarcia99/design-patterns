/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

// chatroom

class User {
  constructor(
    private username: string,
    private chatroom: ChatRoom,
  ) {
    this.chatroom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`${this.username} send: `, message);
    this.chatroom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string) {
    console.log(
      `${this.username} received from ${sender.username}, ${message}`,
    );
  }
}

class ChatRoom {
  constructor(
    private title: string,
    private users: User[] = [],
  ) {}

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((u) => u !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

function main() {
  const chatroom = new ChatRoom("Box Montellano");

  const pepe = new User("pepe", chatroom);
  const lethi = new User("lethi", chatroom);

  pepe.sendMessage("hola cariño");
  pepe.sendMessage("como estas");

  lethi.sendMessage("hola, estoy bien, y tu?");
}

main();
