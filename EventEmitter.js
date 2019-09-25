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
                const register = [];
                return () => {
                    const values = this._eventEmittedValues__Stack.get(eventName) || [];
                    const tmp = values.filter(value => -1===register.indexOf(value));
                    console.log(values,tmp)
                    tmp.forEach(value => {
                        register.push(value);
                        callback(value)
                    });
                    return callback;
                }


            },
            LAST: (eventName, callback) => {
                
                return callback;
            },
            FIRST: (eventName, callback) => {
                
                const values = this._eventEmittedValues__Stack.get(eventName) || [];
                const value = values.find(x => x !== undefined);
                if (value) callback(value);
                
                return () => { };
            }
        }
    }

    constructor() {
        if (INSTANCE) return INSTANCE = this;
        this._eventEmittedValues__Stack = new Map;
    }

    on(eventName, strategy, callback = strategy) {
        
        console.count(`Event counter -> ${eventName}`);
        if (typeof strategy != "string") strategy = EventEmitter.DEFAULT_VALUES.ESTRATEGY;
        new Subject(eventName).addObserver(this.ESTRATEGIES[strategy].call(this, eventName, callback))
        
    }

    emit(eventName, context = true) {
        
        
        if (!this._eventEmittedValues__Stack.has(eventName)) this._eventEmittedValues__Stack.set(eventName, []);
        const values = this._eventEmittedValues__Stack.get(eventName);
        values.push(context);
        new Subject(eventName, context).notify();
        
    }
}

const emitter = new EventEmitter;

emitter.emit('login', 'primeo');
emitter.emit('login', 'segundo');
emitter.emit('login', 'tercero');

emitter.on('login', 'HISTORIC_ALL', (data) => { console.log('HISTORIC_ALL', data) });

emitter.emit('login', 'angel');


emitter.on('login', 'HISTORIC_ALL', (data) => { console.log('este deben de ser solo el ultimo', data) });




//emitter.on('login', 'FIRST', (data) => { console.log('FIRST', data) })
//emitter.on('login', (data) => { console.log('<Primer login> ', data) });

//emitter.emit('login');

/* emitter.on('login', (data) => { console.log('<Segundo login> ', data) });

emitter.emit('login');

// Pruebas
emitter.emit('login');


emitter.on('login', (data) => { console.count('<Ultimo login, tiene q ser n veces> ', data) });

//emitter.emit('login');

//emitter.on('login', _ => { console.log('ultimo') && console.count('ultimo') })
//emitter.emit('login');


//emitter.on('login', 'HISTORIC_ALL', _ => { console.log('historic all') && console.count('ultimo') })
//emitter.on('login', 'HISTORIC_ALL', _ => { console.log('historic all second') && console.count('ultimo') })

// emitter de control para saber que no lo hace siempre
/* emitter.on('pp', (status) => {
    console.log('soy pepe', status)
}); */
//emitter.emit('login');

