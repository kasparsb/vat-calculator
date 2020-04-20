import eh from './helpers/eh';
import pn from './helpers/pn';
import addCssClass from './helpers/addCssClass';
import removeCssClass from './helpers/removeCssClass';

function handleEl(el) {
    if (el.querySelector('input').checked) {
        addCssClass(el, 'toggle-switch--enabled');
    }
    else {
        removeCssClass(el, 'toggle-switch--enabled');
    }
}

function handleChecbox(el) {
    handleEl(pn(el, '.toggle-switch'));
}

function setEvents() {
    eh(document, 'change', '.toggle-switch input', ev => handleChecbox(ev.target))
}

export default {
    init() {
        setEvents()
    },
    handleEl(el) {
        handleEl(el)
    },
    handleChecbox(el) {
        handleChecbox(el)
    }
}