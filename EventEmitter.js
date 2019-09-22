import Subject from './Subject.js';

let INSTANCE = null;



export default class EventEmitter {

    static get DEFAULT_VALUES() {
        return {
            ESTRATEGY: "LAST"
        }
    }

    get ESTRATEGIES() {
        return {
            HISTORIC_ALL: (eventName, callback) => {
                console.groupCollapsed('estrategia: HISTORIC_ALL =-> ', eventName)
                const values = this._eventEmittedValues__Stack.get(eventName) || [];
                console.log('valores a comunicar -> ', values);
                values.forEach(callback);
                console.groupEnd()
                return callback;
            },
            LAST: (eventName, callback) => {
                console.groupCollapsed('estrategia::LAST =-> ', eventName);
                console.groupEnd();
                return callback;
            },
            FIRST: (eventName, callback) => {
                console.groupCollapsed('estrategia::FIRST =-> ', eventName)
                const values = this._eventEmittedValues__Stack.get(eventName) || [];
                const value = values.find(x => x !== undefined);
                if (value) callback(value);
                console.groupEnd();
                return () => { };

            }
        }
    }

    constructor() {
        if (INSTANCE) return INSTANCE = this;
        this._eventEmittedValues__Stack = new Map;
    }

    on(eventName, strategy, callback = strategy) {
        console.groupCollapsed('ON :: ', eventName);
        console.count(`Event counter -> ${eventName}`);
        if (typeof strategy != "string") strategy = EventEmitter.DEFAULT_VALUES.ESTRATEGY;
        new Subject(eventName).addObserver(this.ESTRATEGIES[strategy].call(this, eventName, callback))
        console.groupEnd()
    }

    emit(eventName, context = true) {
        console.groupCollapsed('EMIT :: ', eventName);
        console.count(`Emit ounter -> ${eventName}`);
        if (!this._eventEmittedValues__Stack.has(eventName)) this._eventEmittedValues__Stack.set(eventName, []);
        const values = this._eventEmittedValues__Stack.get(eventName);
        values.push(context);
        console.log('values -> ', values);
        new Subject(eventName, context).notify();
        console.groupEnd()
    }
}

const emitter = new EventEmitter;

emitter.emit('login');
emitter.emit('login');
emitter.on('login', 'FIRST', (data) => { console.log('FIRST', data) })
emitter.on('login', (data) => { console.log('<Primer login> ', data) });

emitter.emit('login');

/* emitter.on('login', (data) => { console.log('<Segundo login> ', data) });

emitter.emit('login');

// Pruebas
emitter.emit('login');


*/emitter.on('login', (data) => { console.count('<Ultimo login, tiene q ser n veces> ', data) });

emitter.emit('login');

emitter.on('login', _ => { console.log('ultimo') && console.count('ultimo') })
emitter.emit('login');


emitter.on('login', 'HISTORIC_ALL', _ => { console.log('historic all') && console.count('ultimo') })
emitter.on('login', 'HISTORIC_ALL', _ => { console.log('historic all second') && console.count('ultimo') })

// emitter de control para saber que no lo hace siempre
/* emitter.on('pp', (status) => {
    console.log('soy pepe', status)
}); */
emitter.emit('login');

