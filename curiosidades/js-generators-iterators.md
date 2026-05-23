# JavaScript Generators, Iterators y Computed Property Names

## Resumen completo

Este documento resume los conceptos clave vistos en la conversación sobre:
- Computed Property Names
- Generators
- Iterators
- Symbols
- Async Generators
- Metaprogramación en JavaScript

---

## 1. Computed Property Names `[]`

Permiten definir propiedades dinámicas:

```js
const key = 'name';

const obj = {
  [key]: 'Pepe'
};
```

También permiten expresiones:

```js
const obj = {
  ['user' + 'Name']: 'Pepe',
  [1 + 1]: 'dos'
};
```

---

## 2. Métodos dinámicos

```js
const method = 'save';

const api = {
  [method]() {
    console.log('saving');
  }
};
```

---

## 3. Getters y Setters dinámicos

```js
const prop = 'value';

const obj = {
  get [prop]() {
    return 123;
  },
  set [prop](v) {
    console.log(v);
  }
};
```

---

## 4. Generators (`function*`)

```js
function* gen() {
  yield 1;
  yield 2;
}
```

- Devuelven un iterator
- Controlados con `.next()`

---

## 5. `yield` y `yield*`

### yield

Pausa ejecución:

```js
function* f() {
  yield 1;
  yield 2;
}
```

### yield*

Delegación:

```js
function* a() {
  yield 1;
}

function* b() {
  yield* a();
}
```

---

## 6. Iteradores

Un objeto es iterable si implementa:

```js
[Symbol.iterator]
```

Ejemplo:

```js
const range = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
};
```

---

## 7. Async Generators

```js
async function* stream() {
  yield 1;
  yield 2;
}
```

Uso:

```js
for await (const v of stream()) {}
```

---

## 8. Symbol.iterator y Symbol.asyncIterator

### síncrono

```js
*[Symbol.iterator]() {}
```

### asíncrono

```js
async *[Symbol.asyncIterator]() {}
```

---

## 9. Symbols importantes

### toPrimitive

```js
const obj = {
  [Symbol.toPrimitive]() {
    return 42;
  }
};
```

### hasInstance

```js
class A {
  static [Symbol.hasInstance](obj) {
    return obj.ok;
  }
}
```

### toStringTag

```js
const obj = {
  get [Symbol.toStringTag]() {
    return 'Custom';
  }
};
```

---

## 10. Clases y métodos dinámicos

```js
const method = 'run';

class A {
  [method]() {}
}
```

---

## 11. Namespaces dinámicos

```js
const module = 'user';

const store = {
  [`${module}:create`]() {},
  [`${module}:delete`]() {}
};
```

---

## 12. Iteración con spread

```js
[...obj]
```

usa:

```js
obj[Symbol.iterator]()
```

---

## 13. Async iteration

```js
for await (const x of obj) {}
```

usa:

```js
[Symbol.asyncIterator]()
```

---

## 14. Concepto clave

JavaScript usa todo esto para metaprogramación:

- iterables
- streams
- frameworks
- proxies
- ORMs
- routers
