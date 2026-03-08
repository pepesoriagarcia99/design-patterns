/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from '../../helpers/colors.ts';

class Gpu {
  public cores?: number;
  public memory?: number;

  displayConfiguration() {
    console.log(`GPU:
      Núcleos: ${this.cores ?? 'No definido'}  
      Memoria: ${this.memory ?? 'No definida'}  
      `);
  }
}

class GpuBuilder {
  private gpu: Gpu;

  constructor() {
    this.gpu = new Gpu();
  }

  setCores(cores: number): GpuBuilder {
    this.gpu.cores = cores;
    return this;
  }

  setMemory(memory: number): GpuBuilder {
    this.gpu.memory = memory;
    return this;
  }

  build() {
    return this.gpu;
  }
}

/**
 * Elemento complejo
 */
class Computer {
  public cpu: string = 'cpu - not defined';
  public ram: string = 'ram - not defined';
  public storage: string = 'storage - not defined';
  public gpu?: Gpu;

  displayConfiguration() {
    console.log(`Configuración de la computadora
      CPU: ${this.cpu}  
      RAM: ${this.ram}  
      Almacenamiento: ${this.storage}  
      GPU: ${this.gpu ? this.gpu.displayConfiguration() : 'No tiene GPU'}  
      `);
  }
}

/**
 * Builder
 */
class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: Gpu): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

function main() {
  const basicComputer: Computer = new ComputerBuilder()
    .setCPU('Intel Core 2 Dúo')
    .setRAM('4GB')
    .setStorage('256GB')
    .build();

  console.log('%cComputadora básica:', COLORS.blue);
  basicComputer.displayConfiguration();

  const gamingGPU = new GpuBuilder()
    .setCores(16)
    .setMemory(24)
    .build();

  const gamingComputer = new ComputerBuilder()
    .setCPU('Intel i9')
    .setRAM('64GB')
    .setStorage('1TB M2')
    .setGPU(gamingGPU)
    .build();

  console.log('%c\nComputadora gamer\n', COLORS.cyan);
  gamingComputer.displayConfiguration();
}

main();
