/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

/**
 * Usamos ente patron cuando queremos implementar parcialmente logica
 * que los hijos reutilizen/tengan en comun,
 */

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater(): void {
    console.log("hirviendo el agua");
  }

  private pourInCup(): void {
    console.log("Sirviendo taza");
  }

  protected abstract addMainIngredient(): void;
  protected abstract addCondiments(): void;
}

class Tea extends HotBeverage {
  constructor() {
    super();
    super.prepare();
  }

  protected override addMainIngredient(): void {
    console.log("añadiendo bolsa de te");
  }
  protected override addCondiments(): void {
    console.log("añadiendo miel y limon");
  }
}

class Coffee extends HotBeverage {
  constructor() {
    super();
    super.prepare();
  }
  protected override addMainIngredient(): void {
    console.log("añadiendo cafe");
  }
  protected override addCondiments(): void {
    console.log("añadiendo azucar");
  }
}

function main() {
  console.log("preparando te");
  const tea = new Tea();

  console.log("\npreparando cafe");
  const coffee = new Coffee();
}

main();
