
/*function altera(el) {
    let r = document.querySelectorAll('input[name=r]')[0].value,
        g = document.querySelectorAll('input[name=g]')[0].value,
        b = document.querySelectorAll('input[name=b]')[0].value,
        a = document.querySelectorAll('input[name=a]')[0].value
    let v = el.value, n = el.name;
    let rgba = `rgba(${r}, ${g}, ${b}, ${a})`
    let hex = rgbaToHex(rgba)
    console.log(rgba)
    n == 'a' ? $('#' + n).value = parseFloat(v) : $('#' + n).value = parseInt(v)
    bg($('.pr'), r, g, b, a)
    let p = $('#hex')
    p.innerText = `${hex}`
    hex == '#000000ff' ? p.style.color = '#fff' : p.style.color = '#000'
}*/

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
    constructor(){};

    trim(str) {
        return toString(str).replace(/^\s+|\s+$/gm, '');
    };

    convert(c) {
        return parseInt(c, 10).toString(16)
    }

    setBg(e, r, g, b, a) {
        let rgba = `rgba(${r}, ${g}, ${b}, ${a || 1})`;
        e.style.background = rgba;
        console.log(rgba);
    }
}

class Picker extends Observer {
    constructor(){
        super();
        // this.observer = new Observer();
        this.utils = new Utils();
        this.colors = {'r':255,'g':255,'b':255,'a':1};
        this.hex = '#ffffff'
        this.$ = document.querySelectorAll.bind(document);
    }

    addEvent(el) {
        const _this = this
        el.map(i => {
            this.$(`.${i['class']}`).forEach(item => {
                item.addEventListener('input', e => {
                    let color = i.var === 'a' ? parseFloat(item.value) : parseInt(item.value)
                    this.colors[i['var']] = color

                    // console.log(`\nEvent: ${color}`)

                    this.notify({
                        'type': 'setValue',
                        _this,
                        'data': [i['class'], color]
                    })
                })
            })
        })
    }

    rgba2hex() {
        let hexad = {'r':'','g':'','b':'','a':''};
        for (let k in this.colors) {
            let con = this.utils.convert(this.colors[k])
            
            // console.log(`${k} : ${con}`)
            
            hexad[k] = con
        };

        if(this.colors['a'] != 1.0 || this.colors['a'] != 1) {
            let a = this.colors['a'];
            hexad['a'] = Math.round(parseFloat(a).toFixed(2) * 255).toString(16).substring(0,2);
        } else {
            delete hexad.a
        }

        hexad = Object.values(hexad)
        this.hex = `#${hexad.join('')}`
    }

    adaptrgba2hex(data) {
        data._this.rgba2hex()
    }

    setValues({type, _this, data}) {
        // console.log(type, _this, data)
        if (type == 'setValue') {
            _this.$(`.${data[0]}`).forEach(i => i.value = data[1]);
        }
    }

    setEx(data) {
        let p = document.querySelector('#hex'),
        _this = data._this
        p.innerText = _this.hex;

        let {r,g,b,a} = _this.colors
        _this.utils.setBg(document.querySelector('.pr'),r,g,b,a)
    }

    init() {
        this.subscribe(this.adaptrgba2hex)
        this.subscribe(this.setValues)
        this.subscribe(this.setEx)

        this.addEvent([
            {'class': 'red', 'var': 'r'},
            {'class': 'green', 'var': 'g'},
            {'class': 'blue', 'var': 'b'},
            {'class': 'alpha', 'var': 'a'}
        ])
    }
}

const p = new Picker()
p.init()
