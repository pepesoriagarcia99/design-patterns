/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { sleep } from "../../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;

  selectProduct(): void;

  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    // estado inical
    this.state = new WaitingForMoney(this);
  }

  insertMoney(): void {
    this.state.insertMoney();
  }

  selectProduct(): void {
    this.state.selectProduct();
  }

  dispenseProduct(): void {
    this.state.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambio a ${newState.name}`);
  }

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  name: string = "Esperando Dinero";

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log("Dinero insertado, ahora puedes seleccionar producto");
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }

  selectProduct(): void {
    console.log("Primero debes insertar dinero");
  }

  dispenseProduct(): void {
    console.log("Primero debes insertar dinero");
  }
}

class ProductSelected implements State {
  name: string = "Seleccionando producto";

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log("Ya insertaste dinero");
  }

  selectProduct(): void {
    console.log("Producto seleccionado, dispensando producto");
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log("Primero debes seleccionar producto");
  }
}

class DispensingProduct implements State {
  name: string = "Dispensando producto";

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log("Ya insertaste dinero");
  }

  selectProduct(): void {
    console.log("Dispensando producto");
  }

  dispenseProduct(): void {
    console.log("Dispensando producto");
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();

    console.log(`selecciona una opcion: ${vendingMachine.getStateName()}`);

    selectedOption = prompt(`
        1. insertar dinero
        2. seleccionar producto
        3. dispensar
        4. salir
    `);

    if (selectedOption === "1") {
      vendingMachine.insertMoney();
      await sleep(1500)
    } else if (selectedOption === "2") {
      vendingMachine.selectProduct();
      await sleep(1500)
    } else if (selectedOption === "3") {
      vendingMachine.dispenseProduct();
      await sleep(1500)
    } else if (selectedOption === "4") {
      console.log("saliendo del sistema");
    } else {
      console.log("Opcion no valida");
      await sleep(3000)
    }

  } while (selectedOption !== "4");
}

main();
