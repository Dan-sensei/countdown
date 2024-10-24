import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            boxShadow: {
                dark: "0px 8px 20px rgba(0, 0, 0, 0.4)",
                light: "0px 7px 10px rgba(0, 0, 0, 0.12)",
                "dark-sm-red": "0px 4px 7px rgba(82, 27, 34, 1)",
                "light-dark": "3px 5px 10px rgba(0, 0, 0, 0.6)",
                "glow-pink": "0px 0px 12px rgba(245, 66, 248, 0.5)",
                "inner-roulete": "inset 0 0 10px rgba(0, 0, 0, 0.25)",
                "inner-roulete-red": "inset 0 -2px 0 #AD2DA0, inset 0 2px 0 #E24BE5, 0 10px 27px 0 #FA01F633",
                "inner-roulete-black": "inset 0 -2px 0 #272B33, inset 0 2px 0 #3B3F47, 0 10px 27px 0 #FFFFFF10",
                "inner-roulete-green": "inset 0 -2px 0 #82774F, inset 0 2px 0 #EDDDA1, 0 10px 27px 0 #E7DCB31A",
                "inner-roulete-red-2": "inset 0 -3px 0 #AD2DA0, inset 0 2px 0 #E24BE5, 0 10px 27px 0 #FA01F633",
                "inner-roulete-black-2": "inset 0 -3px 0 #272B33, inset 0 2px 0 #3B3F47, 0 10px 27px 0 #FFFFFF10",
                "inner-roulete-green-2": "inset 0 -3px 0 #82774F, inset 0 2px 0 #EDDDA1, 0 10px 27px 0 #E7DCB31A",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "tg-dark": "#131221",
                "tg-aqua": "#1DBFF1",
                "tg-sky": "#02DFFC",
                "tg-purple": "#3C116D",
                "tg-steal": "#5A96B2",
                "tg-gray": "#C6C5CD",
                "tg-plum": "#3F304F",
                "tg-pink": "#F542F8",
                "tg-bubblegum": "#F884FB",
                "tg-navy": "#042C7C",
                "tg-lavender": "#7E6A9A",
                "tg-lilac": "#CEACD3",
                "tg-maroon": "#521B22",
                "tg-text": "#BFBFCD",
                "tg-enabled": "#39DD67",
                "tg-red": "#DD3939",
                "tg-dark-purple": "#151421",
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "text-shadow": (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") }
            );
            matchUtilities(
                {
                    "animation-delay": (value) => {
                        return {
                            "animation-delay": value,
                        };
                    },
                },
                {
                    values: theme("transitionDelay"),
                }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    mask: (value) => ({
                        maskImage: value,
                        WebkitMaskImage: value,
                    }),
                },
                { values: theme("maskImage") }
            );
        }),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".backface-visible": {
                    "backface-visibility": "visible",
                },
                ".backface-hidden": {
                    "backface-visibility": "hidden",
                },
            });
        }),
        nextui({
            addCommonColors: true,
        }),
    ],
};
export default config;
