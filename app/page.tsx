"use client";
import { DateTime } from "luxon";
import Countdown from "./components/countdown";
import { oxanium } from "./lib/fonts";

export default function Home() {
    const list = [DateTime.utc().set({ year: 2024, month: 12, day: 2, hour: 12, minute: 0, second: 0 }).toMillis()];
    return (
        <div className={`${oxanium.className} relative min-h-[100vh] flex flex-col overflow-hidden`}>
            <div className="flex justify-center relative">
                <div className="hidden lg:block relative min-w-[1120px] w-full pointer-events-none">
                    <img className="absolute translate-y-10 -translate-x-10 rotate-3 right-0 shadow-dark ml-auto" src="/confia.png" alt="Confia" />
                    <img
                        className="absolute translate-y-10 -translate-x-20 rotate-3 left-0 -scale-x-100 shadow-dark mr-auto"
                        src="/evil_pepe.png"
                        alt="Confia"
                    />
                    <img
                        className="absolute translate-y-96 -translate-x-20 rotate-3 right-0 top-96 -scale-x-100 drop-shadow mr-auto"
                        src="/kermit.png"
                        alt="Confia"
                        width={300}
                    />
                </div>
            </div>
            <div className="block lg:hidden">
                <img className="absolute translate-y-10 -translate-x-10 rotate-3 right-0 shadow-dark ml-auto" src="/confia.png" alt="Confia" />
            </div>
            <main className="flex flex-col flex-1 h-full items-center justify-center">
                <div className="text-center text-xl tracking-widest text-gray-400">FIRMA DEL PISO</div>
                <Countdown className="text-4xl lg:text-8xl" colorFrom="text-yellow-400" type="simple" targetList={list} />
            </main>
            <div className="block lg:hidden">
					<img
                        className="absolute translate-y-72  rotate-3 right-0 top-96 -scale-x-100 drop-shadow mr-auto"
                        src="/kermit.png"
                        alt="Confia"
                        width={300}
                    />
                <img
                    className=" rotate-3 left-0 -scale-x-100 shadow-dark mr-auto"
                    src="/evil_pepe.png"
                    alt="Confia"
                />
            </div>
        </div>
    );
}
