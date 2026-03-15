/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.

import { COLORS } from '../../helpers/colors.ts';


interface NotificationChannel {
    send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
    constructor(private email: string) {}

    send(message: string): void {
        console.log(`Enviando correo electrónico a ${this.email} => ${message}`);
    }
}

class SMSChannel implements NotificationChannel {
    constructor(private phoneNumber: string) {}

    send(message: string): void {
        console.log(`Enviando SMS a ${this.phoneNumber} => ${message}`);
    }
}

class PushNotificationChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Enviando Push: ${message}`);
    }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
    protected channels: NotificationChannel[];

    constructor(channels: NotificationChannel[] = []) {
        this.channels = channels;
    }

    public addChannel(channel: NotificationChannel): void {
        this.channels.push(channel);
    }

    abstract notify(message: string): void;
}


class AlertNotification extends Notification {
    override notify(message: string): void {
        console.log('\n%cNotificación de Alerta:', COLORS.red);
        this.channels.forEach(c => c.send(message));
    }
}

function main() {
    const channels: NotificationChannel[] = [
        new EmailChannel('eppe'),
        new SMSChannel('1234567890'),
        new SMSChannel('9876543210'),
        new PushNotificationChannel()
    ];

    const alert = new AlertNotification(channels);
    alert.notify('¡Alerta de seguridad!');

}  

main();
