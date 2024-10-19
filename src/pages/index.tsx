import { useState } from "react";
import Image from "next/image";
import React from "react";
import { Vortex } from "@/ui/vortex";
import { BackgroundGradient } from "@/ui/background-gradient";
import { TextGenerateEffect } from "@/ui/text-generate-effect";

const words = `SUWIT JAWA`;

const SuwitJawa = () => {
  const [computerImage, setComputerImage] = useState<string>("/img/gajah.png");
  const [result, setResult] = useState<string>("");

  // Fungsi untuk mendapatkan pilihan komputer
  const getPilihanComputer = (): string => {
    const random = parseFloat(Math.random().toFixed(1)); // Convert to number
    if (random < 0.34) return "gajah";
    if (random >= 0.34 && random < 0.64) return "semut";
    return "orang";
  };

  // Fungsi untuk mendapatkan hasil dari pilihan player dan komputer
  const getHasil = (player: string, computer: string): string => {
    if (player === computer) return "seri";
    if (player === "gajah") return computer === "orang" ? "menang" : "kalah";
    if (player === "semut") return computer === "gajah" ? "menang" : "kalah";
    if (player === "orang") return computer === "semut" ? "menang" : "kalah";
    return "kalah";
  };

  // Fungsi untuk memutar gambar komputer
  const putarGambar = () => {
    const gambar = ["gajah", "orang", "semut"];
    let i = 0;
    const waktuMulai = new Date().getTime();
    const interval = setInterval(() => {
      if (new Date().getTime() - waktuMulai > 1000) {
        clearInterval(interval);
        return;
      }
      setComputerImage(`/img/${gambar[i++]}.png`);
      if (i === gambar.length) i = 0;
    }, 100);
  };

  // Fungsi ketika player memilih gambar
  const handleClick = (playerChoice: string) => {
    const pilihanComputer = getPilihanComputer();
    const hasil = getHasil(playerChoice, pilihanComputer);
    putarGambar();

    setTimeout(() => {
      setComputerImage(`/img/${pilihanComputer}.png`);
      setResult(hasil);
    }, 1000);
  };

  return (
    <Vortex className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold text-center text-white mb-10">
        <TextGenerateEffect words={words} />
      </h1>

      <div className=" mx-auto p-4">
        <div className="w-full max-w-md md:max-w-md mx-auto">
          {/* Area komputer */}
          <BackgroundGradient className=" md:p-5 md:m-2 rounded-lg md:mb-4 p-1 flex justify-center items-center  ">
            <Image
              width={60}
              height={60}
              src={computerImage}
              alt="Computer Choice"
              className="md:w-24 md:h-24  rounded-full"
            />
          </BackgroundGradient>

          {/* Info hasil */}
          <div className="my-10 max-w-xs mx-auto">
            <BackgroundGradient className=" px-5 m-2 rounded-lg flex justify-center ">
              <div className="w-40 h-16 border-4 border-pink-300 bg-white text-pink-500 text-2xl font-semibold rounded-full flex items-center justify-center">
                {result}
              </div>
            </BackgroundGradient>
          </div>

          {/* Area player */}
          <BackgroundGradient className="py-4 rounded-lg flex justify-between">
            <button
              onClick={() => handleClick("gajah")}
              className="focus:outline-none"
            >
              <Image
                src="/img/gajah.png"
                alt="Gajah"
                className="md:w-24 md:h-24 rounded-full transition-transform duration-200 hover:scale-110"
                width={60}
                height={60}

              />
            </button>
            <button
              onClick={() => handleClick("orang")}
              className="focus:outline-none"
            >
              <Image
                src="/img/orang.png"
                alt="Orang"
                className="md:w-24 md:h-24 rounded-full transition-transform duration-200 hover:scale-110"
                width={60}
                height={60}
              />
            </button>
            <button
              onClick={() => handleClick("semut")}
              className="focus:outline-none"
            >
              <Image
                src="/img/semut.png"
                alt="Semut"
                className="md:w-24 md:h-24 rounded-full transition-transform duration-200 hover:scale-110"
                width={60}
                height={60}
              />
            </button>
          </BackgroundGradient>
        </div>
      </div>
    </Vortex>
  );
};

export default SuwitJawa;
