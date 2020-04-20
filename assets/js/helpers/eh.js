function eh(el, eventName, querySelector, cb) {

    el.addEventListener(eventName, function(ev){

        var p = ev.target;
        
        if (querySelector) {
            while (p && (p !== el)) {

                if (p.matches(querySelector)) {

                    cb(ev, p);

                    return;
                }

                p = p.parentNode;
            }
        }
        else {
            cb(ev, p);
        }

    })
}

export default eh