import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-full flex flex-col">
      <div className="container mx-auto text-center my-auto xl:mt-auto xl:mb-0">
        <h3 className="text-[42px] leading-[1.2] font-bold text-slate-800 mb-6">
          Asisten AI{" "}
          <span className="from-secondary-brand to-accent-brand inline-block bg-gradient-to-br bg-clip-text text-transparent">
            Tercerdas
          </span>{" "}
          <br /> Siap Membantu Kebutuhan Anda
        </h3>
        <p className="m-auto mt-3 w-2/3 text-slate-600 mb-4">
          Dapatkan jawaban cepat dan akurat kapan saja. Chatbot AI kami siap
          membantu menjawab pertanyaan, memberikan informasi, dan meningkatkan
          efisiensi layanan Anda secara profesional.
        </p>
        <Image
          alt=""
          src={"/bg-img-landing.png"}
          className="absolute top-0 left-0 -z-10 w-full"
          fill
          unoptimized
        />
        <Image
          alt=""
          src={"/hero-img.png"}
          className="w-full mt-auto"
          width={400}
          height={400}
          unoptimized
        />
      </div>
    </section>
  );
}
