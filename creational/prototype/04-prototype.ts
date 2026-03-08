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

class _Document {
  public title: string;
  private content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): _Document {
    return new _Document(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(`
      Title: ${this.title}
      Content: ${this.content}
      Author: ${this.author}
    `);
  }
}

function main() {
  const document1 = new _Document('Cotización', '500 dólares', 'Fernando');

  console.log({ document1 });
  document1.displayInfo();

  const document2 = document1.clone();
  document2.title = 'Nueva cotización';

  console.log({ document2 });
  document2.displayInfo();
}

main();
