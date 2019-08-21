import Subject from './Subject.js';

let INSTANCE = null;

export default class EventEmitter {
    constructor() {
        if (INSTANCE) return INSTANCE = this;;
    }

    on(eventName, callback) {
        console.group(eventName);
        const eventNameArray = eventName.split(' ');
        console.log(eventNameArray);
        
        /* Si se cumple uno de los eventos */
        eventNameArray.forEach(eventName => {
            new Subject(eventName).addObserver(callback);  
        });          

        /* Si se cumplen todos los eventos */
        /*eventNameArray.forEach(eventName => {

            //new Subject(eventName).addObserver(callback);  
        });*/        

        /* legacy */
        //new Subject(eventName).addObserver(callback);
        console.groupEnd();
    }

    emit(eventName, context = true) {
        new Subject(eventName).status = context;
    }
}

const emitter = new EventEmitter;

emitter.on('login cookie', (status) => {
    console.log('los dos eventos', status)
});

emitter.on('login cookie', (status) => {
    console.log('los dos eventos segunda vez', status)
});

emitter.on('login cookie ogt', (status) => {
    console.log('tres eventos con ogt', status)
});

emitter.on('ogt', (status) => {
    console.log('solo ogt', status)
});

emitter.on('login', (status) => {
    console.log('solo login', status)
});

emitter.on('cookie', (status) => {
    console.log('solo cookie', status)
});


/* Pruebas */
emitter.emit('login');
//emitter.emit('cookie');
//emitter.emit('ogt');




/* emitter de control para saber que no lo hace siempre*/
emitter.on('pp', (status) => {
    console.log('soy pepe', status)
});






