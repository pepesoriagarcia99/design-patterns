/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("La luz se ha encendido.");
  }

  turnOff(): void {
    console.log("La luz se ha apagado.");
  }
}

class Fan {
  on(): void {
    console.log("El ventilador está encendido.");
  }

  off(): void {
    console.log("El ventilador está apagado.");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    const command = this.commands[button];
    if (command) {
      command.execute();
      return;
    }

    console.log(`No hay comando asignado al botón "${button}".`);
  }
}

function listener(remoteControl: RemoteControl) {
  const button = prompt(
    "Ingrese el botón a presionar (lightOn, lightOff, fanOn, fanOff, offProgram):",
  );

  if (button == "offProgram") {
    console.log("Apagando el programa...");
    return;
  }

  remoteControl.pressButton(button!);
  listener(remoteControl);
}

function main() {
  const light = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  const remoteControl = new RemoteControl();
  remoteControl.setCommand("lightOn", lightOnCommand);
  remoteControl.setCommand("lightOff", lightOffCommand);
  remoteControl.setCommand("fanOn", fanOnCommand);
  remoteControl.setCommand("fanOff", fanOffCommand);

  listener(remoteControl);
}

main();
