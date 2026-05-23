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

interface _Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(
    public name: string,
    public type: string,
  ) {}
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(p: Pokemon) {
    this.pokemons.push(p);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }

    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  createIterator() {
    /**
     * * la colleccion genera el iterador de forma oculta
     */
    return new PokemonIterator(this);
  }
}

/**
 * * estructura el iterador basica
 * La idea no es solo recorrer lista sencillas, si no poder recorrer cualquier estructura de datos.
 */
class PokemonIterator implements _Iterator<Pokemon> {

    constructor(
        private collection: PokemonCollection, 
        private position: number = 0
    ) {}

    next(): Pokemon | null {
        if(this.hasNext()) return this.collection.getPokemonAt(this.position++);

        return null;
    }

    hasNext(): boolean {
        return this.position < this.collection.getLength();
    }

    current(): Pokemon | null {
        return this.collection.getPokemonAt(this.position);
    }

}


function main() {
    const pokedex = new PokemonCollection();

    pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'));
    pokedex.addPokemon(new Pokemon('Charmander', 'Fire'));
    pokedex.addPokemon(new Pokemon('Squirtle', 'Water'));

    const iterator = pokedex.createIterator();

    while(iterator.hasNext()) {
        const pokemon = iterator.next()

        if(pokemon) {
            console.log(`pokemon: ${pokemon.name}`);
        }
    }
}

main();