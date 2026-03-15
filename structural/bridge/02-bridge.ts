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

/**
 * * Me permite ir escalando mis habilidades
 */
interface Ability {
    use() : void
}

class SworAttack implements Ability {
    use(): void {
        console.log('Ataque con espada');
    }
}

class MagicSpell implements Ability {
    use(): void {
        console.log('Lanzar hechizo mágico');
    }
}

class AxeAttack implements Ability {
    use(): void {
        console.log('Ataque con hacha');
    }
}

class FireBallSpell implements Ability {
    use(): void {
        console.log('Lanzar bola de fuego');
    }
}

/**
 * Implementacion de personaje
 */
abstract class Character {
    protected ability: Ability;

    constructor(ability: Ability) {
        this.ability = ability;
    }

    public setAbility(ability: Ability): void {
        this.ability = ability;
    }

    abstract performAbility(): void;
}

/**
 * * Me permite ir escalando mis personajes
 */
class Warrior extends Character {

    constructor(ability: Ability) {
        super(ability);
    }

    override performAbility(): void {
        console.log('El guerrero esta listo');
        
        this.ability.use();
    }
}

class Mage extends Character {

    constructor(ability: Ability) {
        super(ability);
    }

    override performAbility(): void {
        console.log('El mago esta listo');
        this.ability.use();
    }
}

function main() {
    const warrior = new Warrior(new SworAttack());
    const mage = new Mage(new MagicSpell());

    warrior.performAbility();
    mage.performAbility();


    warrior.setAbility(new AxeAttack());
    warrior.performAbility();

    mage.setAbility(new FireBallSpell());
    mage.performAbility();
}

main();