import Image from "next/image";

export default function Home() {
  return (
    <section className="max-h-80vh relative place-items-center">
      <div className="container py-6 text-center">
        <h3 className="text-[42px] leading-[1.2] font-bold text-slate-800">
          Your{" "}
          <span className="from-secondary-brand to-accent-brand inline-block bg-gradient-to-br bg-clip-text text-transparent">
            Smartest
          </span>{" "}
          AI Assistant <br /> Is Here
        </h3>
        <p className="m-auto mt-3 w-3/4 text-slate-600">
          Whether you're streamlining support, automating tasks, or just need
          fast answers—our AI is ready <br /> 24/7 to lighten your load and
          boost your workflow.
        </p>
        <Image
          alt=""
          src={"/bg-img-landing.png"}
          className="absolute top-0 left-0 -z-10 w-full"
          fill
          unoptimized
        ></Image>
        <Image
          alt=""
          src={"/hero-img.png"}
          className="w-full"
          width={400}
          height={400}
          unoptimized
        ></Image>{" "}
      </div>
    </section>
  );
}
