import formatNumber from './formatNumber';

function results(onCalc) {
    this.precision = 2;
    this.onCalc = onCalc;

    this.vatRate;
    this.vatRateDecimal;
    this.subtotal;
}

results.prototype = {
    setVatRate(v) {
        this.vatRate = parseInt(v, 10);
        this.vatRateDecimal = this.vatRate/100;

        this.onCalc(this.calc());
    },

    setPrecision(p, silent) {
        this.precision = p;

        if (!silent) {
            this.onCalc(this.calc());
        }
    },

    setSubtotal(v, silent) {
        this.subtotal = parseFloat(v);

        if (!silent) {
            this.onCalc(this.calc());
        }
    },

    calcAdd() {
        let vat = this.subtotal * this.vatRateDecimal;

        let r = {
            subtotal: formatNumber(this.subtotal, this.precision),
            vatRate: this.vatRate,
            vat: formatNumber(vat, this.precision),
            total: formatNumber(this.subtotal + vat, this.precision),
            totalWov: formatNumber(this.subtotal, this.precision)
        }

        r.equation = '<b>'+r.totalWov + '</b> + ' + r.vat + ' = ' + r.total;

        return r;
    },

    calcRemove() {
        let totalWov = this.subtotal / (1 + this.vatRateDecimal);

        let r = {
            subtotal: formatNumber(this.subtotal, this.precision),
            vatRate: this.vatRate,
            vat: formatNumber(this.subtotal - totalWov, this.precision),
            total: formatNumber(this.subtotal, this.precision),
            totalWov: formatNumber(totalWov, this.precision)
        }

        r.equation = r.totalWov + ' + ' + r.vat + ' = <b>' + r.total+'</b>';

        return r;
    },

    calc() {
        return {
            add: this.calcAdd(),
            remove: this.calcRemove()
        }
    }
}

export default results