import Head from 'next/head'
import { useState, useEffect } from 'react'
import clientPromise from '../lib/mongodb'

export default function Home({ data }) {
  const [nomer, setNo] = useState(0);

  console.log(data)

  useEffect(() => {
    console.log(nomer)
  }, [nomer])

  return (
    <div className="container">
      <Head>
        <title>OBROLIN</title>
        <meta name="description" content="Bingung cari topik waktu bareng sama temen, pacar, atau keluarga? OBROLIN aja" />
        <meta property="og:title" content="obrolin" />
        <meta property="og:description" content="Bingung cari topik waktu bareng sama temen, pacar, atau keluarga? OBROLIN aja" />
        <meta property="og:url" content="https://www.obrolin.site/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Work+Sans&display=swap" rel="stylesheet"></link>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2129625653442333"
     crossorigin="anonymous"></script>
      </Head>

      <nav className='bg-white w-screen px-24 py-2 fixed top-0 flex justify-center'>
        <a href='/' className='text-2xl font-montserrat font-semibold'>OBROLIN</a>
      </nav>
      
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-orange-300'>
        <h1 className='absolute bottom-[-10rem] opacity-0 text-2xl font-extrabold font-montserrat w-2/3 mb-4'>Cari topik yang kamu ingin kan</h1>
        <div className="w-3/4 md:w-2/3 h-1/2 md:h-4/6 md:m-auto border-4 border-slate-800 bg-white">
          <div className="pt-4 bg-sky-200">
            <div className="flex ml-4 mb-4 ">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-yellow-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
            </div>
            <div className="h-1 w-full bg-slate-800"></div>
          </div>
          
          <div className="p-4 h-5/6 flex flex-col justify-center items-center">
          
            <p className='text-xl md:text-3xl font-bold leading-8 md:leading-10 px-2 py-4 h-3/4 w-full font-worksans'>{ data[nomer].pertanyaan }</p>

            <button
              onClick={() => setNo(Math.floor(Math.random() * data.length))}
              className='bg-teal-400 text-white border-2 border-slate-800 px-10 md:px-12 py-3 mb-2 text-xl md:gtext-2xl font-opensans font-semibold'
              >
              TOPIK LAINNYA
            </button>
            </div>
        </div>
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    const client = await clientPromise
    const db = client.db("question")

    const data = await db.collection("questions").find({}).toArray()

    return {
      props: { 
        data: JSON.parse(JSON.stringify(data))
        // data : {"nama": "dan"}
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
