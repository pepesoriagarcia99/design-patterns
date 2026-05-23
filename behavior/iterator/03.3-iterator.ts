/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

// Clase que representa una Carta de la baraja
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa la colección de Cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCardAt(index: number): Card | null {
    if (index >= 0 && index < this.cards.length) {
      return this.cards[index];
    }
    return null;
  }

  //TODO: Implementación del iterador usando Symbol.iterator
    *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;

    // esta opcion es lo mismo pero sin yield*
    // for(const card of this.cards) {
    //   yield card;
    // }
  }

  // TODO: Implementación del iterador usando Generadores
  // *getCard(): IterableIterator<Card>

  get length (): number {
    return this.cards.length;
  }

  getIterator() {
    return new cardIterator(this);
  }
}

class cardIterator implements Iterator<Card> {
  constructor(
    private collection: CardCollection,
    private position: number = 0,
  ) {}

  next(): IteratorResult<Card> {
    if (this.position < this.collection.length) {
      const card = this.collection.getCardAt(this.position);
      this.position++;
      return { value: card!, done: false } as IteratorResult<Card>;
    }
    return { value: undefined, done: true } as IteratorResult<Card>;
  }

  return?(value?: any): IteratorResult<Card, any> {
    throw new Error("Method not implemented.");
  }

  throw?(e?: any): IteratorResult<Card, any> {
    throw new Error("Method not implemented.");
  }

  hasNext(): boolean {
    return this.position < this.collection.length;
  }

  current(): Card | null {
    return this.collection.getCardAt(this.position);
  }
}

// Código Cliente para probar el iterador

function main(): void {
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección
  deck.addCard(new Card("As de Corazones", 1));
  deck.addCard(new Card("Rey de Corazones", 13));
  deck.addCard(new Card("Reina de Corazones", 12));
  deck.addCard(new Card("Jota de Corazones", 11));

  // Recorrer la colección en orden usando for...of
  console.log("Recorriendo la colección de cartas:");
  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }

  // Recorrer la colección usando el iterador explícito
  console.log("\nRecorriendo la colección usando el iterador explícito:");
  const iterator = deck.getIterator();
  while (iterator.hasNext()) {
    const card = iterator.next().value;
    if (card) {
      console.log(`Carta: ${card.name}, Valor: ${card.value}`);
    }
  }
}

main();
