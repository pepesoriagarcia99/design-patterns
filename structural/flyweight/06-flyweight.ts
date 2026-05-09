/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

interface Coordinates {
    x: number;
    y: number;
}

interface _Location {
    display(coordinates: Coordinates): void;
}

// Flyweight
class LocationIcon implements _Location {
    private type: string; // hospital, restaurant, etc.
    private icon: string; // imagen

    constructor(type: string, icon: string) {
        this.type = type;
        this.icon = icon;
    }

    display({ x, y }: Coordinates): void {
        console.log(
            `Displaying ${this.type} icon at (${x}, ${y})`
        );
    }
}

// Fabrica de Flyweights
class LocationFactory {
    private icons: Record<string, LocationIcon> = {};

    getLocationIcon(type: string): LocationIcon {
        if (!this.icons[type]) {
            console.log(`Creating new icon for type: ${type}`);
            this.icons[type] = new LocationIcon(type, `icon_for_${type.toLowerCase()}.png`);
        }
        return this.icons[type];
    }
}

class MapLocation {
    private coordinates: Coordinates;
    private icon: LocationIcon;

    constructor(coordinates: Coordinates, icon: LocationIcon) {
        this.coordinates = coordinates;
        this.icon = icon;
    }

    display(): void {
        this.icon.display(this.coordinates);
    }
}

function main() {
    const factory = new LocationFactory();
    const locations: MapLocation[] = [
        new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 15, y: 25 }, factory.getLocationIcon('Restaurant')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
        new MapLocation({ x: 20, y: 30 }, factory.getLocationIcon('Hospital')),
    ];

    locations.forEach(location => location.display());
}

main();
