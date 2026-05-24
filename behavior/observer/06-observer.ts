/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
    notify(videoId: string): void;
}

class YoutubeChannel {
    private subscribers: Observer[] = []

    constructor(private name: string){}

    subscribe(observer: Observer) {
        this.subscribers.push(observer);
        console.log(`nuevo suscriptor al canal ${this.name}`); 
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`sale suscriptor del canal ${this.name}`); 
    }

    uploadVideo(video: string): void {
        console.log(`canal ${this.name} ha subido un nuevo video ${video}`);
        for (const element of this.subscribers) {
            element.notify(video);
        }
    }
}

class Subscriber implements Observer {
    constructor(private name: string) {

    }

    notify(videoId: string): void {
        console.log(`${this.name} notificado por nuevo video ${videoId}`);
    }
}

function main() {
    const channel = new YoutubeChannel('cocina')

    const pepe = new Subscriber('pepe')
    const le = new Subscriber('le')
    const edu = new Subscriber('edu')

    channel.subscribe(pepe)
    channel.subscribe(le)

    channel.uploadVideo('galletas')

    channel.subscribe(edu)

    channel.uploadVideo('pizza')

    channel.unsubscribe(pepe)

    channel.uploadVideo('pan de pueblo')
}

main()
