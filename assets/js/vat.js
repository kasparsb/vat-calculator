import infinityswipe from 'infinityswipe';
import qs from './helpers/qs';
import qsa from './helpers/qsa';
import getElementOffset from './helpers/getElementOffset';

function vat(vatRate, container, onChange) {

    this.onChange = onChange;

    this.vatRates = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
    ];

    this.container = container;
    this.infty = null;

    this.initInfinity();

    setTimeout(() => this.infty.showSlide(this.vatRates.indexOf(vatRate)), 5);
}

vat.prototype = {
    initInfinity() {

        this.infty = new infinityswipe(
            qs(this.container, '.vat'),
            qsa(this.container, '.vat__item'),
            {
                positionItems: true,
                slidesPadding: 8,
                snapPosition: {
                    x: this.getSnapPositionX(),
                    y: undefined
                }
            }
        );

        this.infty.onSlideAdd((index, el, slide) => this.slideAdd(index, el, slide));
        this.infty.onChange(() => this.handleChange());
        this.infty.onClick(slide => this.handleClick(slide));
    },

    /**
     * Nosakā pozīciju pret kuru snapot slides
     * Tas būs vat__value elements. Vajag, lai aktīvais elements ir virs 
     * vat__value elementa
     * Nosakām vat__value elementa x pozīciju this.container elementā
     */
    getSnapPositionX() {
        let p1 = getElementOffset(this.container);
        

        let p2 = getElementOffset(qs(this.container, '.vat__value'));
        

        return p2.left - p1.left;
    },

    handleClick(slide) {
        this.infty.showSlide(slide.index);
    },

    handleChange() {
        let r = this.infty.getCurrent().customData.vatRate;

        //qs(this.container, '.vat__value').innerHTML = r+'%';
        this.onChange(r);
    },

    slideAdd(index, el, slide) {
        let i;

        if (index < 0) {
            // Ņemam slaidu no masīva beigām
            if (index % this.vatRates.length === 0) {
                i = 0;
            }
            else {
                i = this.vatRates.length + (index % this.vatRates.length);
            }
            
        }
        else {
            i = index % this.vatRates.length;
        }

        slide.customData.vatRate = this.vatRates[i];
        el.innerHTML = '<span>'+this.vatRates[i]+'%</span>';
    },

    resize() {
        let currentIndex = this.infty.getCurrent().index;

        this.infty.resize();

        this.infty.setSnapPosition({
            x: this.getSnapPositionX(),
            y: undefined
        });

        // Pēc resize atjaunojam current index
        this.infty.showSlide(currentIndex);
    }
}

export default vat