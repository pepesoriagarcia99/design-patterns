import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class

export class LocalLogger {

    constructor(private file: string) {

    }

    writeLog(msg: string): void {
        console.log(`[${this.file}] Log ${msg}`)
    }

    writeError(msg: string): void {
        console.log(`[${this.file}] Log %c${msg}`, COLORS.red)

    }

    writeWarnig(msg: string): void {
        console.log(`[${this.file}] Log %c${msg}`, COLORS.yellow)

    }

}
