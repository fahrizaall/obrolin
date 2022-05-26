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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <nav className='bg-gray-500 w-screen px-24 py-2'>
        <a href='/' className='text-xl text-white'>Obrolin</a>
      </nav>
      
      <main className='px-24 py-6'>
        <h1 className='text-2xl font-bold text-slate-800'>Pertanyaan Acak</h1>
        
        <p className='text-3xl font-bold px-2 py-4'>{ data[nomer].pertanyaan }</p>

        <button
          onClick={() => setNo(Math.floor(Math.random() * data.length))}
          className='bg-blue-500 text-white px-4 py-1'
        >
          Tampilkan Pertanyaan Lain
        </button>
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
