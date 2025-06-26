import Image from "next/image";

export default function Home() {
  return (
    <section>
      <div className="container">
        <h3 className="text-center text-[42px] font-bold">
          Your{" "}
          <span className="bg-gradient-to-br to-primary inline-block bg-clip-text text-transparent">
            Smartest
          </span>{" "}
          AI Assistant Is Here
        </h3>
      </div>
    </section>
  );
}
