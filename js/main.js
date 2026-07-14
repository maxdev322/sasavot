const preloader = document.querySelector(".preloader");
const percent = document.querySelector(".preloader__percent");

const images = [...document.images];
const total = images.length;

let loaded = 0;
let current = 0;
let target = 0;
let finished = false;

function animateCounter() {

    current += (target - current) * 0.12;

    percent.textContent = Math.round(current) + "%";

    if (finished && current >= 140.5) {

        percent.textContent = "141%";

        gsap.to(preloader, {
            opacity: 0,
            delay: 1,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {

                preloader.remove();

                playHeroIntro();

            }
        });

        return;
    }

    requestAnimationFrame(animateCounter);
}

animateCounter();

function updateProgress() {

    loaded++;

    target = (loaded / total) * 141;

    if (loaded === total) {

        finished = true;
        target = 141;

    }

}

if (!total) {

    finished = true;
    target = 141;

} else {

    images.forEach(img => {

        if (img.complete) {

            updateProgress();

        } else {

            img.addEventListener("load", updateProgress);
            img.addEventListener("error", updateProgress);

        }

    });

}
function playHeroIntro() {

    const tl = gsap.timeline();

    // sa
    tl.to(".hero__main_text span:nth-child(1)", {
        opacity: 1,
        filter: "blur(0rem)",
        duration: 0.01,
        ease: "none"
    })

        // sa
        .to(".hero__main_text span:nth-child(2)", {
            opacity: 1,
            filter: "blur(0rem)",
            duration: 0.01,
            ease: "none"
        }, "+=0.7")

        // vot
        .to(".hero__main_text span:nth-child(3)", {
            opacity: 1,
            filter: "blur(0rem)",
            duration: 0.01,
            ease: "none"
        }, "+=0.7")

        // нижние тексты
        .to(
            [
                ".hero__content_bottom_text",
                ".hero__content_bottom_scroll"
            ],
            {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.08
            },
            "+=0.5"
        )

        // голова
        .to(".head_video", {
            // opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=5");

}


window.addEventListener("load", () => {

    Marquee3k.init()

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        autoRaf: true,
        duration: 2,
        smoothWheel: true,
        smoothTouch: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.set(".hero__main_text span", {
        opacity: 0,
        filter: "blur(10rem)"
    });

    gsap.set([
        ".hero__content_bottom_text",
        ".hero__content_bottom_scroll",
        // ".head_video"
    ], {
        opacity: 0
    });



    ScrollTrigger.create({
        trigger: ".negative",
        start: "top -50%",

        animation: gsap.to(".negative__item:nth-child(1)", {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            paused: true
        }),

        toggleActions: "play none none reverse"
    });

    ScrollTrigger.create({
        trigger: ".negative",
        start: "top -140%",

        animation: gsap.to(".negative__item:nth-child(2)", {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            paused: true
        }),

        toggleActions: "play none none reverse"
    });

    ScrollTrigger.create({
        trigger: ".negative",
        start: "top -230%",

        animation: gsap.to(".negative__item:nth-child(3)", {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            paused: true
        }),

        toggleActions: "play none none reverse"
    });

    ScrollTrigger.create({
        trigger: ".negative",
        start: "top -320%",

        animation: gsap.to(".negative__content", {
            opacity: 0,
            filter: "blur(20rem)",
            duration: 0.5,
            paused: true
        }),

        toggleActions: "play none none reverse"
    });

    gsap.fromTo(".iamgleb__content",
        {
            x: "120vw"
        },
        {
            x: "-180vw",
            ease: "none",
            scrollTrigger: {
                trigger: ".iamgleb",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2
            }
        }
    );

    gsap.to(".head_video", {
        scale: 0.85,
        opacity: 0.4,
        filter: "blur(10rem)",
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: ".iamgleb",
            start: "top top",
            end: "top+=40%",
            scrub: 1.2
        }
    });

    gsap.set(".head_video", {
        scale: 0.85,
        opacity: 0.4,
        filter: "blur(10rem)"
    });

    gsap.to(".head_video", {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: ".iamgleb",
            start: "bottom-=30% bottom",
            end: "bottom bottom",
            scrub: 1.2
        }
    });

    gsap.set(".head_video", {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)"
    });

    gsap.utils.toArray(".orpk__item").forEach((item) => {

        const text = item.querySelector(".orpk__item_text");

        gsap.fromTo(text,
            {
                y: "-100%"
            },
            {
                y: "0%",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",   // верх элемента = низ экрана
                    end: "top center",  // центр элемента = центр экрана
                    scrub: true
                }
            }
        );

    });

    gsap.fromTo(".about__img img",
        {
            y: "0%"
        },
        {
            y: "40%",
            ease: "none",
            scrollTrigger: {
                trigger: ".about",
                start: "top bottom",   // верх элемента = низ экрана
                end: "bottom top",  // центр элемента = центр экрана
                scrub: true
            }
        }
    );

    gsap.to(".zoj__photo_item:nth-child(2)", {
        y: "-150%",
        ease: "none",
        scrollTrigger: {
            trigger: ".zoj__photo_list",
            start: "top center",
            end: "bottom top",
            scrub: 1.5
        }
    });

    gsap.to(".iamgleb__gif:nth-child(2)", {
        x: "-650%",
        ease: "none",
        scrollTrigger: {
            trigger: ".iamgleb",
            start: "top top",
            end: "bottom bottom",
            scrub: 3
        }
    });

    gsap.to(".iamgleb__gif:nth-child(3)", {
        x: "-450%",
        ease: "none",
        scrollTrigger: {
            trigger: ".iamgleb",
            start: "top top",
            end: "bottom bottom",
            scrub: 3
        }
    });

    gsap.to(".gang__blood", {
        width: "1200rem",
        ease: "none",
        duration: 0.15,
        scrollTrigger: {
            trigger: ".gang__141",
            start: "center 65%",
        }
    });

    gsap.utils.toArray(".gang__list_item").forEach((item) => {

        gsap.fromTo(item,
            {
                opacity: 0
            },
            {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",     // верх айтема касается низа экрана
                    end: "center center",    // центр айтема касается центра экрана
                    scrub: true
                }
            }
        );

    });

    const prizes = gsap.utils.toArray(".slay__prize");

    gsap.to(prizes[0], {
        x: "150rem",
        y: "-250rem",
        rotate: 20,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
            trigger: ".slay",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
        }
    });

    gsap.to(prizes[1], {
        x: "-120rem",
        y: "180rem",
        rotate: -15,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
            trigger: ".slay",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
        }
    });

    gsap.to(prizes[2], {
        x: "90rem",
        y: "-120rem",
        rotate: 10,
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
            trigger: ".slay",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
        }
    });
    gsap.to(".big_vid__anim", {
        scale: 0.4,
        ease: "none",
        scrollTrigger: {
            trigger: ".big_vid",
            start: "top top",
            end: "bottom 120%",
            scrub: true,
        }
    });

    gsap.fromTo(".victims__title_big",
        {
            opacity: 0,
            filter: "blur(20rem)"
        },
        {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".victims__title_big",
                start: "center center",
                toggleActions: "play none none reverse"
            }
        }
    );

    gsap.to(".victims__title", {
        opacity: 0,
        filter: "blur(20rem)",
        // scale: 0.7,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
            trigger: ".victims__item:last-child",
            start: "bottom top",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to(".sec_white", {
        backgroundColor: "#121212",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".victims__title_big",
            start: "center center",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to(".smoke", {
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
            trigger: ".about",
            start: "top center",
            end: "top top",
            toggleActions: "play none none reverse"
        }
    });

    gsap.fromTo(".smoke",
        {
            opacity: 0
        },
        {
            opacity: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
                trigger: ".victims__title_big",
                start: "center center",
                toggleActions: "play none none reverse"
            }
        });

    function shake(selector, config = {}) {

        const {
            x = 3,
            y = 3,
            duration = 0.06,
            delay = 0
        } = config;

        gsap.set(selector, {
            x: 0,
            y: 0
        });

        gsap.to(selector, {
            x: () => gsap.utils.random(-x, x),
            y: () => gsap.utils.random(-y, y),
            duration,
            ease: "none",
            repeat: -1,
            repeatRefresh: true,
            delay
        });

    }

    shake(".menace__word:nth-child(1)", {
        x: 2,
        y: 4,
        duration: 0.04
    });

    shake(".menace__word:nth-child(2)", {
        x: 5,
        y: 2,
        duration: 0.04,
        delay: 0.03
    });

    const items = gsap.utils.toArray(".time__item");

    const basePositions = [
        { x: -520, y: -260 },
        { x: -480, y: -120 },
        { x: -560, y: 0 },
        { x: -500, y: 140 },
        { x: -540, y: 280 },

        { x: 520, y: -260 },
        { x: 480, y: -120 },
        { x: 560, y: 0 },
        { x: 500, y: 140 }
    ];

    // Fisher–Yates shuffle (правильный, стабильный)
    function shuffle(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const positions = shuffle(basePositions);

    // стартовые состояния
    items.forEach((item, i) => {

        gsap.set(item, {
            x: positions[i].x,
            y: positions[i].y,
            xPercent: -50,
            yPercent: -50,

            z: 1200,
            scale: 1.6,

            opacity: 0,
            filter: "blur(20px)"
        });

    });

    ScrollTrigger.create({
        trigger: ".time",
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {

            const p = self.progress;

            items.forEach((item, i) => {

                // 🔥 1. УВЕЛИЧЕН ДЕЛЕЙ (меньше overlap = больше ритма)
                const delay = 0.3; // можешь крутить этот параметр

                const timelineLength = 1 + delay * items.length;

                const local = gsap.utils.clamp(
                    0,
                    1,
                    (p * timelineLength - i * delay)
                );

                // глубина
                const z = gsap.utils.interpolate(1200, -4200, local);
                const scale = gsap.utils.interpolate(1.6, 0.3, local);

                // мягкий вход/выход
                const fadeIn = gsap.utils.clamp(0, 1, local / 0.3);
                const fadeOut = gsap.utils.clamp(0, 1, (1 - local) / 0.3);
                const opacity = Math.min(fadeIn, fadeOut);

                // blur (оставляем киношный фокус)
                const blur = local < 0.5
                    ? gsap.utils.interpolate(20, 0, local / 0.5)
                    : gsap.utils.interpolate(0, 20, (local - 0.5) / 0.5);

                // 🔥 2. СИЛЬНЕЕ "из сторон в центр"
                const sidePull = (1 - local) * 1.4; // усиливает сход к центру

                const x = positions[i].x * sidePull;
                const y = positions[i].y * (0.9 + (1 - local) * 0.2);

                gsap.set(item, {
                    x,
                    y,
                    z,
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`
                });

            });

        }
    });

    gsap.to(".time__title", {
        scale: 0.1,
        filter: "blur(10rem)",
        opacity: 0,
        y: "150rem",
        ease: "none",
        scrollTrigger: {
            trigger: ".time",
            start: "top top",
            end: "center center",
            scrub: true,
        }
    });

    gsap.to(".kursk__img_wrap_wrap", {
        y: "650rem",
        ease: "none",
        scrollTrigger: {
            trigger: ".kursk",
            start: "top bottom",
            end: "center -20%",
            scrub: true,
        }
    });

    gsap.to(".kursk__img_wrap", {
        width: "450rem",
        height: "592rem",
        // borderRadius: "0%",
        ease: "none",
        scrollTrigger: {
            trigger: ".kursk",
            start: "top bottom",
            end: "top top",
            scrub: true,
        }
    });

    gsap.to(".kursk__text_up", {
        x: "-350rem",
        ease: "none",
        scrollTrigger: {
            trigger: ".kursk__text",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    gsap.to(".kursk__text_down", {
        x: "350rem",
        ease: "none",
        scrollTrigger: {
            trigger: ".kursk__text",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    const frames = document.querySelectorAll(".big_vid__anim_img");

    let currentFrame = 0;

    setInterval(() => {

        frames[currentFrame].style.opacity = 0;

        currentFrame++;

        if (currentFrame >= frames.length) {
            currentFrame = 0;
        }

        frames[currentFrame].style.opacity = 1;

    }, 250);

    gsap.timeline({
        scrollTrigger: {
            trigger: ".menace",
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    })

        .to(".menace__kus img:nth-child(1)", {
            x: "-70rem",
            y: "-40rem",
            rotation: -18,
            scale: 0.6,
            // opacity: 0,
            ease: "none"
        }, 0)

        .to(".menace__kus img:nth-child(3)", {
            x: "150rem",
            y: "20rem",
            rotation: 18,
            scale: 1.3,
            // opacity: 0,
            ease: "none"
        }, 0);

});
