const HEADING_BOX = '#headingBox';
const HEADING_LAST = '#lastHeading';
const HEADING_END = '#headingEndSection';
const HEADER_IMG = '#headerImages'
const SUBTEXT = '.homepage__subtext'
const VIDEO_START = "#videoSection";


//gsap

gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: VIDEO_START,
        scrub: true,
        pin: true,

        start: "50% 50%",
        end: "+=200%"
    }
})
    .fromTo(".homepage__video", {
        scale: 0.5,
        ease: "none"
    }, {
        scale: 1,
        ease: "none"
    }).fromTo(".homepage__video", {
        scale: 1,
        ease: "none"
    }, {
        scale: 0.5,
        ease: "none"
    })

document.addEventListener('DOMContentLoaded', () => {
    const headingBoxElm = document.querySelector(HEADING_BOX);
    const headingEndElm = document.querySelector(HEADING_END);
    const headerImgElm = document.querySelector(HEADER_IMG);
    const headingLastElm = document.querySelector(HEADING_LAST);
    const subtextElm = headingBoxElm.querySelector(SUBTEXT);
    const videoSectionElm = document.querySelector(VIDEO_START);


    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },
        });
    });


    headingBoxElm.addEventListener('animationend', (event) => {
        if (event.animationName === 'fadeOutLeft') {
            headingBoxElm.style.position = 'absolute';
            headingBoxElm.classList.remove('homepage__heading-box--close')
        }
    });


    const addStyle = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('homepage__heading-fadeOut')) {
                    changeTextWithFade(subtextElm, 'Všechny produkty vyrábíme v Praze v České republice.')
                }
                else if(entry.target.classList.contains('homepage__first')) {
                    changeTextWithFade(subtextElm, 'Vlastnit BONCLÉ znamená mnoho. Je jedinečné a rafinované a oslavuje rukodělnou práci, která podtrhne vaše originální já. S BONCLÉ nesplynete s davem, každý kus je jediný takový na světě.')
                }
                else if(entry.target.classList.contains('homepage__last-heading')) {
                    changeTextWithFade(subtextElm, 'Kabelky BONCLÉ z kolekce PŠ.OBJECTS a doplňky Clay Sparks obsahují keramický element, který v sobě nese záhadu dávných dob a sochařského umu a rukopis, který BONCLÉ pozvedá na vyšší úroveň – nejen módního doplňku')
                }
                else {
                    subtextElm.classList.remove('u-opacity-1-animated');
                    headingBoxElm.classList.add('homepage__heading-box--close');
                }

            } else {

            }
        })
    }

    const observer = new IntersectionObserver(addStyle);
    observer.observe(headingEndElm);
    observer.observe(headerImgElm);
    observer.observe(headingLastElm)
    observer.observe(videoSectionElm);


});

const changeTextWithFade = (element, newText) => {
    element.classList.remove('u-opacity-1-animated');
    element.classList.add('u-opacity-0-animated');
    element.addEventListener('animationend', () => {
        element.textContent = newText;
        element.classList.remove('u-opacity-0-animated');
        element.classList.add('u-opacity-1-animated');

    })
}


function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}
