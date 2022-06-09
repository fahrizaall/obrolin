import Image from "next/image";

export default function Custom404() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-orange-300">
      <h1 className="mt-2 font-montserrat font-extrabold text-4xl md:text-8xl text-center">Error <br /> 404</h1>
      <p className="text-md md:text-2xl">Halaman tidak ditemukan :(</p>
    </div>
  )
}