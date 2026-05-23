estoy aprendiendo *[Symbol.iterator]()

que otras opciones de crear una funcion con [...]() tengo en javascript?
y que otras opciones del uso del * con yield o sin yield?

En JavaScript, *[Symbol.iterator]() es una combinación de varias características:

[] → nombre de propiedad computado.
Symbol.iterator → protocolo de iteración.
* → función generadora (generator).
yield → pausa y reanudación de ejecución.

Hay bastantes combinaciones posibles. Te las separo para que se entienda bien.

1. Métodos con nombre computado [ ... ]

Puedes definir métodos usando expresiones dinámicas:

const nombre = 'saludar';

const obj = {
  [nombre]() {
    console.log('hola');
  }
};

obj.saludar();

También con símbolos:

const obj = {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: true };
      }
    };
  }
};
2. Métodos generadores *

El * convierte una función en un generator.

Método generador en objeto
const obj = {
  *miGenerator() {
    yield 1;
    yield 2;
  }
};

Uso:

const gen = obj.miGenerator();

console.log(gen.next());
3. Combinación completa *[...]()

Esto:

const obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
};

equivale conceptualmente a:

obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
};

y permite hacer:

for (const v of obj) {
  console.log(v);
}
4. Otras combinaciones posibles
Método normal
const obj = {
  metodo() {}
};
Método async
const obj = {
  async metodo() {
    return 123;
  }
};
Generator async

Aquí mezclas async + *.

const obj = {
  async *stream() {
    yield 1;
    yield 2;
  }
};

Esto devuelve un AsyncGenerator.

Uso:

for await (const item of obj.stream()) {
  console.log(item);
}
5. Variantes con Symbol
Iterador síncrono
class MiClase {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
}

Compatible con:

for (const x of instancia)
Iterador asíncrono
class MiClase {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
  }
}

Compatible con:

for await (const x of instancia)
6. ¿Qué hace realmente el *?

El * cambia completamente el comportamiento de la función.

Una función normal:

function f() {
  return 1;
}

devuelve:

1

Una generator:

function* f() {
  yield 1;
}

devuelve:

Generator

y se controla con:

next()
7. yield

yield pausa la ejecución:

function* f() {
  console.log('A');
  yield 1;

  console.log('B');
  yield 2;
}
8. yield*

Muy importante y poco conocido.

Delega a otro iterable/generator.

function* a() {
  yield 1;
  yield 2;
}

function* b() {
  yield* a();
  yield 3;
}

Resultado:

1
2
3

También funciona con arrays:

function* f() {
  yield* [1, 2, 3];
}
9. Generator sin yield

Sí, existe:

function* f() {
}

Sigue devolviendo un Generator.

10. yield fuera de generator

Esto es error:

function f() {
  yield 1;
}

porque yield solo funciona dentro de function*.

11. Todas las formas modernas importantes
Función normal
function f() {}
Función async
async function f() {}
Generator
function* f() {}
Async generator
async function* f() {}
Método generator
const obj = {
  *f() {}
};
Método async generator
const obj = {
  async *f() {}
};
Con nombre computado
const obj = {
  *[nombre]() {}
};
12. Ejemplo avanzado real

Objeto iterable personalizado:

const range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }
};

console.log([...range]);

Salida:

[1,2,3,4,5]
13. Relación con [...obj]

Cuando haces:

[...obj]

JavaScript busca:

obj[Symbol.iterator]()

Por eso implementar *[Symbol.iterator]() hace que tu objeto funcione con:

for...of
spread ...
Array.from
destructuring

Ejemplo:

const [a, b] = obj;
14. Otra cosa interesante: generators bidireccionales

Puedes enviar valores hacia dentro:

function* f() {
  const x = yield 'hola';
  console.log(x);
}

const g = f();

g.next();
g.next(123);

Salida:

123

Esto se parece muchísimo a corrutinas.

Sí. Los nombres de propiedad computados ([expresion]) son muchísimo más potentes de lo que parece y se usan bastante en librerías/frameworks avanzados.

1. Lo básico: claves dinámicas
const campo = 'name';

const obj = {
  [campo]: 'Pepe'
};

console.log(obj.name);
2. Expresiones completas

No tiene que ser una variable.

const obj = {
  ['user' + 'Name']: 'Pepe',
  [1 + 1]: 'dos'
};

console.log(obj.userName);
console.log(obj[2]);
3. Métodos dinámicos

Muy usado en metaprogramación.

function createMethod(name) {
  return {
    [name]() {
      console.log('ejecutando');
    }
  };
}

const api = createMethod('save');

api.save();
4. Getters computados
const prop = 'value';

const obj = {
  get [prop]() {
    return 123;
  }
};

console.log(obj.value);
5. Setters computados
const prop = 'value';

const obj = {
  set [prop](v) {
    console.log(v);
  }
};

obj.value = 10;
6. Async methods computados
const method = 'load';

const obj = {
  async [method]() {
    return 'data';
  }
};
7. Generators computados
const iterator = Symbol.iterator;

const obj = {
  *[iterator]() {
    yield 1;
    yield 2;
  }
};
8. Async generators computados

Muy usado en streams.

const obj = {
  async *[Symbol.asyncIterator]() {
    yield 'A';
    yield 'B';
  }
};
9. Propiedades Symbol

Esto es MUY importante.

const ID = Symbol('id');

const obj = {
  [ID]: 123
};

Ventajas:

casi privadas
no colisionan
no aparecen en Object.keys
10. Hooks internos del lenguaje

Aquí está la parte realmente avanzada.

Muchos comportamientos internos de JS usan Symbols.

Puedes redefinirlos:

Iteración
[Symbol.iterator]
Async iteration
[Symbol.asyncIterator]
Conversión primitiva
[Symbol.toPrimitive]

Ejemplo:

const obj = {
  [Symbol.toPrimitive](hint) {
    return 42;
  }
};

console.log(+obj);
instanceof personalizado
class MiClase {
  static [Symbol.hasInstance](obj) {
    return obj.fake === true;
  }
}

console.log({ fake: true } instanceof MiClase);
toString personalizado
const obj = {
  get [Symbol.toStringTag]() {
    return 'Database';
  }
};

console.log(obj.toString());

Resultado:

[object Database]
11. Proxy + computed names

Muy usado en ORMs y frameworks.

function makeEntity(name) {
  return {
    [`find${name}`]() {},
    [`save${name}`]() {}
  };
}

const api = makeEntity('User');

api.findUser();
12. Dynamic dispatch
class Controller {
  ['GET /users']() {}
  ['POST /users']() {}
}

Muy usado en routers internos.

13. Claves privadas simuladas

Antes de #private.

const PRIVATE = Symbol();

class Test {
  [PRIVATE] = 123;
}
14. Decoradores manuales
function logMethods(obj) {
  for (const key of Object.keys(obj)) {
    const old = obj[key];

    obj[key] = function (...args) {
      console.log(key);
      return old.apply(this, args);
    };
  }
}

Muchos frameworks generan métodos computados dinámicamente.

15. Namespaces dinámicos
const module = 'user';

const store = {
  [`${module}:create`]() {},
  [`${module}:delete`]() {}
};

Muy común en Redux/Vuex/event buses.

16. Clases con nombres computados
const method = 'speak';

class Animal {
  [method]() {
    console.log('hola');
  }
}
17. Herencia avanzada
const hook = Symbol.for('hook');

class Base {
  [hook]() {}
}

Frameworks enteros usan esto.

18. Metaprogramación seria

Muchos frameworks usan computed names para:

ORMs
serializadores
inyección de dependencias
RPC
routers
validadores
proxies
compiladores
web components
19. Una combinación MUY potente
const handlers = {
  ['user:create']: async function* () {
    yield 'loading';
    yield 'saving';
    yield 'done';
  }
};

Aquí mezclas:

computed names
async
generators
streams
20. Los patrones más importantes de verdad

Los más útiles en proyectos reales suelen ser:

Symbols
[Symbol.iterator]
[Symbol.asyncIterator]
[Symbol.toPrimitive]
Métodos dinámicos
[`find${entity}`]()
Event systems
[eventName]()
Generators
*[Symbol.iterator]()
Async generators
async *[Symbol.asyncIterator]()
Getters/setters computados
get [prop]()
set [prop]()

La combinación de:

[]
Symbol
async
*
yield
Proxy
Reflect

es básicamente la base de toda la metaprogramación moderna de JavaScript.