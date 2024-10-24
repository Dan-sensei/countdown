import { cubicBezier } from "framer-motion";

export const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
};
export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
export const slideRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};
export const swingIn = {
    hidden: { transform: "rotateX(-100deg)", opacity: 0 },
    visible: { transform: "rotateX(0deg)", opacity: 1 },
};

export const slideY = (amount: number) => ({
    hidden: { opacity: 0, y: amount },
    visible: { opacity: 1, y: 0 },
});

export const parentStagger = (stagger: number) => ({
    hidden: { transition: { staggerChildren: stagger } },
    visible: { transition: { staggerChildren: stagger } },
});

export const parentStaggerDelay = (stagger: number, delay: number) => ({
    hidden: { transition: { staggerChildren: stagger, delayChildren: delay } },
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const popIn = {
    hidden: { scale: 0.2, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
}
export const popInRotate = {
    hidden: { scale: 0.2, opacity: 0, rotateZ: 50 },
    visible: { scale: 1, opacity: 1, rotateZ: 0 },
}
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export const slideRightPx = (amount: number) => ({
    hidden: { opacity: 0, x: amount },
    visible: { opacity: 1, x: 0 },
});
export const easeInOut05 = {
    ease: "easeInOut",
    duration: 0.5,
};

export const smoothOut = {
    ease: cubicBezier( 0.1, 0, 0, 1 ),
    duration: 0.8,
};

export const winnerTransition = {
    hidden: { width: 0, paddingLeft: 0 },
    visible: { width: "auto", paddingLeft: 8 },
};

export const motionShowOnView = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
};

export const motionShow = {
    initial: "hidden",
    animate: "visible",
};
