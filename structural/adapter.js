class Calc {
    add(t1, t2) {
        return t1 + t2
    }

    sub(t1, t2) {
        return t1 - t2
    }
}

class CalcAdapter {
    constructor() {
        this.calc = new Calc()
    }

    operations(t1, t2, operation) {
        switch (operation) {
            case 'add': return this.calc.add(t1, t2);
            case 'sub': return this.calc.sub(t1, t2);
            default: return NaN
        }
    }
}

const adapter = new CalcAdapter();
console.log(adapter.operations(25, 10, 'sub'));
