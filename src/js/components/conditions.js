import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const images = document.querySelectorAll(".cond-img");
    const items = document.querySelectorAll(".conditions__item");

    gsap.timeline({
        scrollTrigger: {
            trigger: ".conditions",
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const activeIndex = Math.min(Math.floor(progress * (images.length - 1)), images.length - 2); // Исключаем последнее изображение

                // Логика для изображений
                images.forEach((img, index) => {
                    if (index === 0) {
                        if (progress > 0.1) {
                            img.classList.add("scroll");
                            gsap.to(img, { opacity: 1, duration: 0.1, delay: 0.5 });
                        } else {
                            img.classList.remove("scroll");
                            gsap.to(img, { opacity: 1, duration: 0.1 });
                        }
                    } else if (index < images.length - 1 && index <= activeIndex) {
                        img.classList.add("scroll");
                        gsap.to(img, { opacity: 1, duration: 0.1 });
                    } else if (index === images.length - 1) {
                        img.classList.remove("scroll");
                        gsap.to(img, { opacity: 1, duration: 0.1 });
                    } else {
                        img.classList.remove("scroll");
                        gsap.to(img, { opacity: 1, duration: 0.1 });
                    }
                });

                // Логика для элементов conditions__item
                items.forEach((item, index) => {
                    if (index === 0) {
                        if (progress > 0.1) {
                            item.classList.add("scroll");
                            gsap.to(item, { opacity: 1, duration: 0.1, delay: 0.5 });
                        } else {
                            item.classList.remove("scroll");
                            gsap.to(item, { opacity: 1, duration: 0.1 });
                        }
                    } else if (index < items.length - 1 && index <= activeIndex) {
                        item.classList.add("scroll");
                        gsap.to(item, { opacity: 1, duration: 0.1 });
                    } else if (index === items.length - 1) {
                        item.classList.remove("scroll");
                        gsap.to(item, { opacity: 1, duration: 0.1 });
                    } else {
                        item.classList.remove("scroll");
                        gsap.to(item, { opacity: 1, duration: 0.1 });
                    }
                });
            },
            onLeaveBack: () => {
                images.forEach(img => img.classList.remove("scroll"));
                gsap.to(images, { opacity: 1, duration: 0.1 });

                items.forEach(item => item.classList.remove("scroll"));
                gsap.to(items, { opacity: 1, duration: 0.1 });
            },
        },
    });
});
