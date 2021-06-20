let debug = true

if (!String.prototype.trim) {
    String.prototype.trim = () => this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

class Observer {
    constructor() {
        if (this.constructor == Observer) {
            throw new Error('Abstract classes can\'t be instantiated.')
        } else {
            this.observers = []
        }
    }

    subscribe(func) {
        this.observers.push(func)
    }

    unsubscibe(func) {
        this.observers = this.observers.filter(subscriber => subscriber !== func)
    }

    notify(data) {
        this.observers.forEach(func => func(data))
    }
}

class Utils {
    constructor(){}

    toHex(c) {
        return parseInt(c, 10).toString(16)
    }

    setBg(e, { r, g, b, a }) {
        let rgba = `rgba(${r}, ${g}, ${b}, ${a || 1})`;
        e.style.background = rgba;
        console.log(rgba);
    }
}

/**
 * 
 * @param { string } str 
 * @param { boolean } unique 
 * @returns { Element | NodeListOf.<Element> }
 */
const $ = (str, unique=false) => {
    if(/^\#/.test(str.trim()) || unique) {
        return document.querySelector(str)
    }

    return document.querySelectorAll(str)
}

class Picker extends Observer {

    /**
     * 
     * @type {{ _this: Picker, type: String, data: Array }}
     */
    static types;

    constructor(){
        super();
        // this.observer = new Observer();
        this.utils = new Utils();
        this.colors = {'r':30,'g':40,'b':50,'a':1};
        this.hex = '#ffffff';
        this.ranges = [];
    }

    /**
     * 
     * @param { Array.<Array.<String>> } opts
     * @returns { void }
     */
    addEvent(opts) {
        const _this = this
        opts.map(i => {
            
            $(`.${i[0]}`).forEach(el => {
                el.addEventListener('input', () => {
                    const color = i[1] == 'a' ? parseFloat(el.value) : parseInt(el.value)

                    this.colors[i[1]] = color

                    if (debug) {
                        console.log(`Array Item: ${i}`)
                        console.log(`Color num: ${color}`)
                        console.log(`Color code: ${i[1]}`)
                    }

                    this.notify({
                        'type': 'setValue',
                        _this,
                        'data': [i[0], color]
                    })
                })
            })
        })
    }

    rgba2hex() {
        let hexad = {'r':'','g':'','b':'','a':''};

        for (let k in this.colors) {
            
            const a = this.colors[k]
            
            hexad[k] = this.utils.toHex(
                k === 'a' ?
                parseFloat(a) * 255 :
                a
            )
        };

        if (hexad.a.toLowerCase() == 'ff') {
            delete hexad.a
        }

        this.hex = `#${Object.values(hexad).join('')}`
    }

    /**
     * 
     * @param { Picker.types } param0 
     */
    adaptrgba2hex({ _this }) {
        _this.rgba2hex()
    }

    /**
     * 
     * @param { Picker.types } param0 
     */
    setValues({ type, data }) {
        // console.log(type, _this, data)
        if (type == 'setValue') {
            $(`.${data[0]}`).forEach(i => i.value = data[1]);
        }
    }

    /**
     * 
     * @param { Picker.types } param0 
     */
    setEx({ _this }) {

        /**
         * @type { HTMLParagraphElement }
         */
        let p = $('#hex')
        p.innerText = _this.hex;

        _this.utils.setBg($('body', true), _this.colors)
    }

    init() {
        this.subscribe(this.adaptrgba2hex)
        this.subscribe(this.setValues)
        this.subscribe(this.setEx)

        this.addEvent([
            ['red', 'r'],
            ['green', 'g'],
            ['blue', 'b'],
            ['alpha', 'a']
        ])
    }
}

const p = new Picker()
debug = !debug
p.init()
