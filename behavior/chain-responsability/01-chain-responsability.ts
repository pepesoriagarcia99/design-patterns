/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if(this.nextHandler) {
        this.nextHandler.handle(request);
    }
  }
}

class BasicSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'basic') {
            console.log('soport basico')
            return;
        }

        console.log('soport basico, pasando a siguiente escalon')
        super.handle(request)
    }
}

class AdvanceSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'advance') {
            console.log('soport avanzado')
            return;
        }

        console.log('soport avanzado, pasando a siguiente escalon')
        super.handle(request)
    }
}

class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'expert') {
            console.log('soport experto')
            return;
        }

        console.log('soport experto, pasando a siguiente escalon')
        super.handle(request)
    }
}

function main() {

    const basicSupport = new BasicSupport();
    const advanceSupport = new AdvanceSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advanceSupport).setNext(expertSupport);
    
    basicSupport.handle('advance');
}
main();
