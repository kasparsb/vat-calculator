/**
 * Event handler which always calls preventDefault on event
 * Callback funkcijai pirmais tiek padots elements, kurš
 * atbilst querySelector, otrais ir event
 * Šī ir atšķirība no eh
 */
function ehp(el, eventName, querySelector, cb) {

    el.addEventListener(eventName, function(ev){

        var p = ev.target;
        while (p && (p !== el)) {

            if (p.matches(querySelector)) {

                // Prevent
                ev.preventDefault();

                // Pirmais ir matched elements nevis event
                cb(p, ev);

                return;
            }

            p = p.parentNode;
        }

    })
}

export default ehp