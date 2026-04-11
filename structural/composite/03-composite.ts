/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

import { COLORS } from "../../helpers/colors.ts";

interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class FileCustom implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(prefix: string = ''): void {
    console.log(`${prefix}|- %cArchivo: ${this.name}`, COLORS.blue);
  }
}

class Folder implements FileSystemComponent {
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(component: FileSystemComponent) {
    this.contents.push(component);
  }

  showDetails(prefix: string = ''): void {
    if (prefix === '') {
      console.log(`+ %cCarpeta: ${this.name}`, COLORS.green);
    } else {
      console.log(`${prefix}|`);
      console.log(`${prefix}|-%cCarpeta: ${this.name}`, COLORS.green);
    }

    const childPrefix = prefix === '' ? '    ' : `${prefix}|   `;
    this.contents.forEach((component) => component.showDetails(childPrefix));
  }
}

function main() {
  const file1 = new FileCustom('archivo1.txt');
  const file2 = new FileCustom('archivo2.txt');
  const file3 = new FileCustom('archivo3.txt');
  const file4 = new FileCustom('archivo4.txt');
  const file5 = new FileCustom('archivo5.txt');

  const folder1 = new Folder('Carpeta 1');
  const folder5 = new Folder('Carpeta 5');
  folder5.add(file5);

  folder1.add(file1);
  folder1.add(file2);

  const folder2 = new Folder('Carpeta 2');
  folder2.add(file3);

  const folder3 = new Folder('Carpeta 3');
  folder3.add(file4);
  folder2.add(folder3);
  folder2.add(folder5);

  const rootFolder = new Folder('Carpeta ROOT');

  rootFolder.add(folder1);
  rootFolder.add(folder2);

  rootFolder.showDetails();
}

main();
