import hasCssClass from './hasCssClass';

function addCssClass(el, className) {
    if (hasCssClass(el, className)) {
        return;
    }

    if (typeof el.classList != 'undefined') {
        el.classList.add(className);
    }
    else {
        el.className += ' '+className;
    }
}

export default addCssClass