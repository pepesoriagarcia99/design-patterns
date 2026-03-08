/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */


class DragonBalls {
    private static instance: DragonBalls;

    private ballsCallected: number;

    private constructor() {
        this.ballsCallected = 0;
    }

    public static getInstanece(): DragonBalls {
        if(!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
        } 

        return DragonBalls.instance;
    }

    collectBall(): void {
        if(this.ballsCallected<7) {
            this.ballsCallected++;

            console.log(`total ${this.ballsCallected}`);
            

            return;
        }

        console.log('ready');
    }
}

function main() {
    const gokuBalls = DragonBalls.getInstanece();

    gokuBalls.collectBall();
    gokuBalls.collectBall();
    gokuBalls.collectBall();
    gokuBalls.collectBall();
}
main();