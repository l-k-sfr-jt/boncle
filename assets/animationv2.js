const HEADING_BOX = '#headingBox';
const HEADING_LAST = '#lastHeading';
const HEADING_END = '#headingEndSection';
const HEADER_IMG = '#headerImages'
const SUBTEXT = '.homepage__subtext'
const VIDEO_START = "#videoSection";
const HOMEPAGE_VIDEO = 'homepageVideo'

const lenis = new Lenis({})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf);

//gsap
gsap.registerPlugin(ScrollTrigger);


gsap.to("#headerImages img", {
    scrollTrigger: {
        triger: "#headerImages", // start the animation when ".box" enters the viewport (once)
        scrub: 3,
    },
    stagger: {
        each: .6,
        from: 'end',
    },
    y: -600,
});

const headerScroll = gsap.timeline({
    defaults: {duration: 1.5},
    scrollTrigger: {
        start: "top center",
        end: "+=320%",
        pin: true,
        trigger: ".homepage__header",
        onLeave: () => {
            gsap.to(".homepage__heading", {x: -600, opacity: 0, overwrite: true, duration: .4});
            gsap.to(SUBTEXT, {x: 600, opacity: 0, overwrite: true, duration: .4});
        },
        onEnterBack: () => {
            gsap.to(".homepage__heading", {x: 0, opacity: 1, overwrite: true, duration: .6});
            gsap.to(SUBTEXT, {x: 0, opacity: 1, overwrite: true, duration: .6});
        }
    }
});



ScrollTrigger.create({
    trigger: '.homepage__arrow',
    start: 0,
    end: '+=250%',
    pin: true,
    markers: true,
    pinSpacing: false,
    onLeave: () => {
        gsap.to(".homepage__arrow img", {opacity: 0, duration: .7});
    },
    onEnterBack: () => {
        gsap.to(".homepage__arrow img", {opacity: 1, duration: .7});
    },
});

gsap.fromTo(".homepage__arrow img", {y: -6}, {
    y: 8, yoyo: true, repeat: -1, duration: 1.5,
    ease: "sine.inOut"
});

ScrollTrigger.create({
    trigger: "#headerImages",
    start: "top 75%",
    onEnter: self => gsap.effects.swapText(SUBTEXT, {text: "Vlastnit BONCLÉ znamená mnoho. Je jedinečné a rafinované a oslavuje rukodělnou práci, která podtrhne vaše originální já. S BONCLÉ nesplynete s davem, každý kus je jediný takový na světě."}),
    onLeaveBack: self => gsap.effects.swapText(SUBTEXT, {text: "Čistá vášeň pro krásu a respekt k poctivému řemeslu skrytý pod rouškou tajemství, které se snoubí v konečném produktu jako tajná posedlost uměním. Každý detail a barevná kombinace kůže, nití a glazury vytvářejí neopakovatelný zážitek – tajemnou neřest ve vašem šatníku."})
});

ScrollTrigger.create({
    trigger: "#headerImages",
    start: "bottom 65%",
    onEnter: self => gsap.effects.swapText(SUBTEXT, {text: "Kabelky BONCLÉ z kolekce PŠ.OBJECTS a doplňky Clay Sparks obsahují keramický element, který v sobě nese záhadu dávných dob a sochařského umu a rukopis, který BONCLÉ pozvedá na vyšší úroveň – nejen módního doplňku."}),
    onLeaveBack: self => gsap.effects.swapText(SUBTEXT, {text: "Vlastnit BONCLÉ znamená mnoho. Je jedinečné a rafinované a oslavuje rukodělnou práci, která podtrhne vaše originální já. S BONCLÉ nesplynete s davem, každý kus je jediný takový na světě."})
});

ScrollTrigger.create({
    trigger: "#headerImages",
    start: "bottom 25%",
    onEnter: self => gsap.effects.swapText(SUBTEXT, {text: "Všechny produkty vyrábíme v Praze v České republice."}),
    onLeaveBack: self => gsap.effects.swapText(SUBTEXT, {text: "Kabelky BONCLÉ z kolekce PŠ.OBJECTS a doplňky Clay Sparks obsahují keramický element, který v sobě nese záhadu dávných dob a sochařského umu a rukopis, který BONCLÉ pozvedá na vyšší úroveň – nejen módního doplňku."})
});

const headerTL = gsap.timeline({defaults: {duration: 1.5}});
headerTL.fromTo('.homepage__heading', {opacity: 0, y: 80}, {opacity: 1, delay: .5})
    .fromTo(SUBTEXT, {opacity: 0, y: 50}, {opacity: 1, y: 0,})
    .to('.homepage__heading', {y: 0}, '<');
headerTL.fromTo('.home .header', {opacity: 0}, {opacity: 1});


//Video
const videoElm = document.getElementById(HOMEPAGE_VIDEO);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: VIDEO_START,
        scrub: true,
        pin: true,
        onEnter: () => videoElm.play(),
        onEnterBack: () => videoElm.play(),
        onLeave: () => videoElm.pause(),
        onLeaveBack: () => videoElm.pause(),
        start: "50% 50%",
        end: "+=200%",
    }
}).fromTo(".homepage__video", {
    scale: 0.5,
    ease: "none"
}, {
    scale: 1.2,
    ease: "none"
}).fromTo(".homepage__video", {
    scale: 1.2,
    ease: "none"
}, {
    scale: 0.5,
    ease: "none"
});


//Collections
gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
    ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
            animateFrom(elem)
        },
    });
});


function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
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

// create a reusable effect that swaps text
gsap.registerEffect({
    name: "swapText",
    effect: (targets, config) => {
        let tl = gsap.timeline({delay: config.delay});
        tl.to(targets, {opacity: 0, duration: config.duration / 2});
        tl.add(() => targets[0].innerText = config.text);
        tl.to(targets, {opacity: 1, duration: config.duration});
        return tl;
    },
    defaults: {duration: 1},
    extendTimeline: true
});


const ham = document.querySelector("#navOpener");
const menu = document.querySelector('#navigation');
const overlay = document.querySelector('#navOverlay');
const links = menu.querySelectorAll('.menu-item');

var navTl = gsap.timeline({paused: true});

navTl.to(menu, {
    duration: 1,
    opacity: 1,
    left: 0,
    width: '33%', // change this to 100vh for full-height menu
    ease: 'expo.inOut',
})

navTl.to(overlay, {
    duration: 1.8,
    opacity: 1,
    width: '100%', // change this to 100vh for full-height menu
    ease: 'expo.inOut',
}, 0)
navTl.from(links, {
    duration: 1,
    opacity: 0,
    x: -20,
    stagger: 0.1,
    ease: 'expo.inOut',
}, "-=0.5");

navTl.reverse();

ham.addEventListener('click', () => {
    navTl.reversed(!navTl.reversed());
});
