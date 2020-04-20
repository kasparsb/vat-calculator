import vat from './vat';
import qs from './helpers/qs';
import eh from './helpers/eh';
import ehp from './helpers/ehp';
import throttle from './helpers/throttle';
import results from './results';
import toggleSwitch from './toggleSwitch';

function setInnerHtml(selector, value) {
    let el = qs(selector);
    if (el) {
        el.innerHTML = value;
    }
}

function outputResults(r) {
    setInnerHtml('.add-vat', r.add.vat);
    setInnerHtml('.add-vat-rate', r.add.vatRate);
    setInnerHtml('.add-subtotal', r.add.subtotal);
    setInnerHtml('.add-total', r.add.total);
    setInnerHtml('.add-total-wov', r.add.totalWov);
    setInnerHtml('.add-equation', r.add.equation);

    setInnerHtml('.remove-vat', r.remove.vat);
    setInnerHtml('.remove-vat-rate', r.remove.vatRate);
    setInnerHtml('.remove-subtotal', r.remove.subtotal);
    setInnerHtml('.remove-total', r.remove.total);
    setInnerHtml('.remove-total-wov', r.remove.totalWov);
    setInnerHtml('.remove-equation', r.remove.equation);
}

toggleSwitch.init();

let r = new results(outputResults);
r.setPrecision(2, true);
r.setSubtotal(0, true);

let defaultVatRate = 21;

let vatSelect = new vat(
    defaultVatRate,
    qs('.calc__vat'), 
    vatRate => r.setVatRate(vatRate)
);

eh(document, 'keyup', '[name=subtotal]', ev => r.setSubtotal(ev.target.value));
eh(document, 'change', '[name=subtotal]', ev => r.setSubtotal(ev.target.value));
ehp(document, 'submit', 'form', () => qs('[name=subtotal]').blur());

eh(document, 'change', '[name=precision3]', ev => r.setPrecision(ev.target.checked ? 3 : 2));

let resize = throttle(() => vatSelect.resize(), 100)
window.addEventListener('resize', resize);