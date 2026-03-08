/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar 
      la interfaz Report, generando el contenido de cada reporte en el método generate.
	  
  2.	Implementen las clases SalesReportFactory e InventoryReportFactory 
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */

import { COLORS } from '../../helpers/colors.ts';

// 1. Definir la interfaz Report
interface Report {
  generate(): void;
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport

class SalesReport implements Report {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  sendToTaxAuthority(): void {
    // ? Implemnetacion propia del report
    // ? Lógica para enviar el reporte a la autoridad fiscal
  }

  generate(): void {
    // * Puedo agregar lógica adicional en la creación del reporte
    // * O desencadenar acciones específicas al generar el reporte
    this.sendToTaxAuthority(); // envía el reporte a la autoridad fiscal

    console.log(`%cGenerando reporte de ventas con ID: ${this.id}`, COLORS.green);
  }
}

class InventoryReport implements Report {
  serial: string;

  constructor(serial: string) {
    this.serial = serial;
  }

  refreshStockData(): void {
    // ? Implemnetacion propia del report
    // ? Lógica para actualizar los datos de stock
  }

  generate(): void {
    // * Puedo agregar lógica adicional en la creación del reporte
    // * O desencadenar acciones específicas al generar el reporte
    this.refreshStockData(); // actualiza los datos de stock

    console.log(`%cGenerando reporte de inventario con serial: ${this.serial}`, COLORS.orange);
  }
}


// 3. Clase Base ReportFactory con el Método Factory
abstract class ReportFactory {
  protected abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// 4. Clases Concretas de Fábricas de Reportes
class SalesReportFactory extends ReportFactory {
  private id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }

  private checkTaxCompliance(): void {
    // ? Implemnetacion propia de la creación del report
    // ? Lógica para verificar el cumplimiento fiscal antes de generar el reporte
  }

  createReport(): Report {
    // * puedo agregar lógica adicional durante la creacion del reporte
    this.checkTaxCompliance(); // comprueba si el reporte cumple con las regulaciones fiscales antes de crearlo

    return new SalesReport(this.id);
  }
}

class InventoryReportFactory extends ReportFactory {
  private serial: string;

  constructor(serial: string) {
    super();
    this.serial = serial;
  }

  createReport(): Report {
    return new InventoryReport(this.serial);
  }
}


// 5. Código Cliente para Probar
function main() {
  let reportFactory: ReportFactory;

  const reportType = prompt('¿Qué tipo de reporte deseas? (sales/inventory)');

  if (reportType === 'sales') {
    const id = Number(prompt('Ingresa el ID de la venta:'));
    reportFactory = new SalesReportFactory(id);
  } else {
    const serial = prompt('Ingresa el serial del inventario:') ?? 'SN-0000';
    reportFactory = new InventoryReportFactory(serial);
  }

  reportFactory.generateReport();
}

main();
