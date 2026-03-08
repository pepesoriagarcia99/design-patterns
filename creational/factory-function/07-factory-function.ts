/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

type Language = 'es' | 'en' | 'fr'


const messages = {
    es: {
        hello: 'hola, como estas?'
    },
    en: {
        hello: 'hello, how are you?'
    },
    fr: {
        hello: 'Bonjour'
    }
}

// i18n
function createGreeater(lang: Language) {
    const langMessage = messages[lang];
    return function (msg: keyof typeof langMessage): string {
        const value = langMessage[msg];
        if (!value) return msg;

        return value;
    }
}
