/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */


import { COLORS } from '../../helpers/colors.ts';

class Attack {
  constructor(public name: string, public damage: number) {}

  displayInfo(): void {
    console.log(`Ataque: ${this.name}, Daño: ${this.damage}`);
  }
}

class Pokemon {
  // name: string;
  // type: string;
  // level: number;
  // attacks: string[];

  constructor(
    public name: string,
    public type: string,
    public level: number,
    public attacks: Attack[]
  ) {
    // throw new Error('Method not implemented.');
  }

  // Método para clonar el Pokémon
  clone(): Pokemon {
    // Los ataques deben de evitar pasarse por referencia, es decir, no deben de ser el mismo arreglo.
    // Completar: Debe devolver un nuevo Pokémon con los mismos atributos

    return new Pokemon(this.name, this.type, this.level, [...this.attacks.map(attack => new Attack(attack.name, attack.damage))]);
  }

  displayInfo(): void {
    console.log(
      `Nombre: ${this.name}\nTipo: ${this.type}\nNivel: ${
        this.level
      }\nAtaques: ${this.attacks.map(attack => `${attack.name} (${attack.damage})`).join(', ')} \n`
    );
  }
}

// Tarea:
// 1. Crear un Pokémon base.
// 2. Clonar el Pokémon base y modificar algunos atributos en los clones.
// 3. Llamar a displayInfo en cada Pokémon para mostrar sus detalles.

// Ejemplo:
function main() {
  const pikachu = new Pokemon('Pikachu', 'Eléctrico', 25, [new Attack('Impactrueno', 40), new Attack('Rayo', 90)]);
  pikachu.displayInfo();

  const pikachuClone = pikachu.clone();
  pikachuClone.name = 'Pikachu Clone';
  pikachuClone.level = 30;
  pikachuClone.attacks.push(new Attack('Cola férrea', 50));
  pikachuClone.displayInfo();
}

main();
