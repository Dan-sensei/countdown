"use client";

import { useEffect, useId, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { isOpened } from "@/app/lib/util";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { motionShowOnView, parentStaggerDelay, popInRotate } from "@/app/lib/motionVariants";

interface CountdownElement {
    value: string;
    label: string;
}

interface Props {
    targetList: number[];
    className?: string;
    onFinishedText?: string;
    colorFrom?: string;
    colorTo?: string;
    onFinished?: () => void;
    type?: "simple" | "hexagonal" | "hhmm";
}
interface TimeLeft {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    switching: boolean;
    switchFlag: boolean;
    finished: boolean;
}

type HexProps = {
    className?: string;
    colorFrom?: string;
    colorTo?: string;
};

const Hexagon = React.memo(({ className, colorFrom, colorTo }: HexProps) => {
    const fillId = useId();
    const strokeId = useId();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${className ?? ""} stroke-[0.5px]`}>
            <defs>
                <linearGradient id={fillId} x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" style={{ stopColor: colorFrom ?? "#F542F8", stopOpacity: "0.2" }} />
                    <stop offset="100%" style={{ stopColor: colorTo ?? "#02DFFC", stopOpacity: "0.2" }} />
                </linearGradient>
                <linearGradient id={strokeId} x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" style={{ stopColor: colorFrom ?? "#F542F8" }} />
                    <stop offset="100%" style={{ stopColor: colorTo ?? "#02DFFC" }} />
                </linearGradient>
            </defs>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                fill={`url(#${fillId})`}
                stroke={`url(#${strokeId})`}
                d="M10.425 1.414l-6.775 3.996a3.21 3.21 0 0 0 -1.65 2.807v7.285a3.226 3.226 0 0 0 1.678 2.826l6.695 4.237c1.034 .57 2.22 .57 3.2 .032l6.804 -4.302c.98 -.537 1.623 -1.618 1.623 -2.793v-7.284l-.005 -.204a3.223 3.223 0 0 0 -1.284 -2.39l-.107 -.075l-.007 -.007a1.074 1.074 0 0 0 -.181 -.133l-6.776 -3.995a3.33 3.33 0 0 0 -3.216 0z"
            />
        </svg>
    );
});
Hexagon.displayName = "Hexagon";

const defTimeLeft = {
    days: "",
    hours: "00",
    minutes: "00",
    seconds: "00",
    switching: false,
    switchFlag: false,
    finished: false,
};

interface TimerProps {
    className: string;
    countdownElements: CountdownElement[];
    colorFrom?: string;
    colorTo?: string;
    isMounted: boolean;
}

export const HexagonalTimer = ({ className, countdownElements, colorFrom, colorTo, isMounted }: TimerProps) => {
    return (
        <div className={className}>
            <motion.div {...motionShowOnView} variants={parentStaggerDelay(0.1, 0.3)} className="flex">
                {countdownElements.map((e, index) => (
                    <motion.div variants={popInRotate} key={index} className="grid grid-stack justify-center text-center items-center">
                        <Hexagon colorFrom={colorFrom} colorTo={colorTo} className={`h-12 w-12] xxs:h-9 xxs:w-9 xs:h-12 xs:w-12`} />
                        {isMounted ? (
                            <div>
                                <div className="text-base xxs:text-tiny xs:text-base font-bold pt-0 xxs:pt-1 xs:pt-0">{e.value}</div>
                                <div className="text-tiny xxs:text-[7px] xs:text-[11px] text-tg-gray -mt-[6px] xxs:-mt-[7px] xs:-mt-[6px]">
                                    {e.label}
                                </div>
                            </div>
                        ) : (
                            <Spinner size="sm" color="secondary" />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export const SimpleTimer = ({ className, countdownElements, colorFrom, isMounted }: TimerProps) => {
    const days = countdownElements[0].value;
    const hms = countdownElements.slice(1);
    return (
        <div className={className ?? ""}>
            {isMounted ? (
                <div className="text-center">
                    <div className="block mt-[1px]">
                        <span className={`inline-block pe-2 text-center ${days !== "0" ? "" : "hidden"} `}>{days}D</span>
                        {hms.map((e, index) => {
                            const val = e.value.padStart(2, "0").split("");
                            return (
                                <React.Fragment key={index}>
                                    {index !== 0 && <span className={clsx("lg:w-7 inline-block text-center", colorFrom || "text-tg-bubblegum")}>:</span>}
                                    <span className="lg:w-12 inline-block text-center ">{val[0]}</span>
                                    <span className="lg:w-12 inline-block text-center ">{val[1]}</span>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <Spinner size="sm" color="secondary" />
            )}
        </div>
    );
};
export const HHmmTimer = ({ className, countdownElements }: TimerProps) => {
    return (
        <div className={className}>
            <div>
                {countdownElements[0] && countdownElements[0].value !== "0" && <span>{countdownElements[0].value}D</span>} {" "}
                {countdownElements[1] && countdownElements[1].value !== "0" && <span>{countdownElements[1].value} HR</span>} {" "}
                {<span>{countdownElements[2].value} MIN</span>}
                {<span>{" "}{countdownElements[3].value} S</span>}
            </div>
        </div>
    );
};
const TimerTypes = {
    ["hexagonal"]: HexagonalTimer,
    ["simple"]: SimpleTimer,
    ["hhmm"]: HHmmTimer,
};

export default function Countdown({ targetList, onFinishedText, className, onFinished, colorFrom, colorTo, type = "hexagonal" }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ ...defTimeLeft });
    useEffect(() => {
        function calculateTimeLeft(): TimeLeft {
            const timeLeft: TimeLeft = { ...defTimeLeft };
            const date = targetList.find((t) => {
                return !isOpened(t);
            });
            if (!date) {
                timeLeft.finished = true;
                return timeLeft;
            }
            const now = new Date();
            const difference = +new Date(date) - +now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                timeLeft.days = days.toString();
                timeLeft.hours = hours.toString();
                timeLeft.minutes = minutes.toString();
                timeLeft.seconds = seconds.toString();
            } else {
                timeLeft.finished = true;
            }

            return timeLeft;
        }
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft({ ...newTimeLeft });
            if (newTimeLeft.finished) {
                clearInterval(timer);
                onFinished?.();
            }
        }, 1000);
        setIsMounted(true);

        return () => clearInterval(timer);
    }, [targetList, onFinished]);

    if (timeLeft.finished) {
        if (onFinishedText) {
            return <span>{onFinishedText}</span>;
        } else {
            return null;
        }
    }

    const countdownElements = [
        { value: timeLeft.days, label: "DAYS" },
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEC" },
    ];

    const Timer = TimerTypes[type];

    if (!Timer) return null;

    return <Timer className={className ?? ""} isMounted={isMounted} countdownElements={countdownElements} colorFrom={colorFrom} colorTo={colorTo} />;
}
