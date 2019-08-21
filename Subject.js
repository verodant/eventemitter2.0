/**
 * @class Observer
 * @classdesc Clase que registra Observadores de estado y comunica a todos los observadores.
 * @author Angel Alcalde <aalcalde@elconfidencial.com>
 *
 * @constructor
 * @param {Object} options - Opciones de customización para esta clase.
 * @returns {Subject}
 * @requires
 */

const INSTANCES = new Map();

export default class Subject {
    /**
     * @param {String} name nombre del Contenedor del Sujeto
     * @param {Mixed} status
     */
    constructor(name, status = undefined) {
        if (INSTANCES.has(name)) return INSTANCES.get(name);
        INSTANCES.set(name, this);

        this.name = name;
        this.observers = [];
        this._status = status;

        return this;
    }

    /**
    * @desc Setter para cambiar el estado del sujeto.
    * @name Subject#set:status
    * @function
    * @methodOf Subject#
    * @param {Mixed} status El estado a guardar
    */
    set status(status) {
        if (this._status !== status) {
            this._status = status;
            this.notify();
        }
    }

    /**
    * @desc Getter para recuperar el estado del sujeto.
    * @name Subject#get:status
    * @function
    * @methodOf Subject#
    */
    get status() {
        return this._status;
    }

    /**
     * @desc Metedo que notifica a todos los observers el estado del sujeto.
     * @method notify
     * @function
     * @methodOf Subject#
     */
    notify() {
        if (this.observers.length) this.observers.forEach(observer => this._notify(observer));
        return this;
    }

    /**
     * @desc Metedo que notifica a un observer el estado del sujeto.
     * @function
     * @method _notify
     * @methodOf Subject#
     * @param {function}
     */
    _notify(observer) {
        if (!(observer instanceof Function)) throw new Error('Se esperaba una funcion para el observer');
        if(this.status != undefined) observer.call(observer, this._status);
        return this;
    }

    /**
     * @method addObserver
     * @desc Metedo añade un Observador.
     * @methodOf Subject#
     * @param {object} observer - Estancia del observador.
     */
    addObserver(observer) {
        this.observers.push(observer);
        this._notify(observer);
        return this;
    }

    /**
     * @method removeObserver
     * @desc Metedo quita un Observador.
     * @methodOf Subject#
     * @param {object} observer - Estancia del observador.
     */
    removeObserver(observer) {
        this.observers = this.observers.filter(item => item !== observer);
        return this;
    }
}
