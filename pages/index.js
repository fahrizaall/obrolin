import Head from 'next/head'
import { useState, useEffect } from 'react'
import clientPromise from '../lib/mongodb'

export default function Home({ data }) {
  const [nomer, setNo] = useState(Math.floor(Math.random() * data.length));
  const [start, setStart] = useState(false);
  // const messages = "Ayo kunjungi https://obrolin.site untuk menemukan berbagai topik untuk menemani kumpul bersama teman, pasangan, atau keluarga"

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(messages);
  // }

  return (
    <div className="w-full">
      <Head>
        <title>Obrolin | Random topic generator</title>
        <meta name="description" content="Dari obrolin hal yang santai sampai serius, cerita lucu sampai putus. Banyak banget topik yang bisa kamu temukan disini. Yuk mulai topik obrolanmu!" />
        <meta property="og:title" content="obrolin" />
        <meta property="og:description" content="Dari obrolin hal yang santai sampai serius, cerita lucu sampai putus. Banyak banget topik yang bisa kamu temukan disini. Yuk mulai topik obrolanmu!" />
        <meta property="og:url" content="https://www.obrolin.site/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Work+Sans&display=swap" rel="stylesheet"></link>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2129625653442333"
     crossOrigin="anonymous"></script>
      </Head>

      <nav className='bg-white w-full px-24 py-2 fixed top-0 flex justify-center'>
        <a href='/' className='text-2xl font-montserrat font-semibold'>OBROLIN</a>
      </nav>
      
      <main className='w-full'>
        <div className="h-screen flex flex-col justify-center items-center bg-orange-300">
          <div className="w-3/4 md:w-2/3 h-1/2 md:h-4/6 md:m-auto border-4 border-slate-800 bg-white relative">
            <div className="pt-4 bg-sky-200">
              <div className="flex ml-4 mb-4 ">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
                <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
                <div className="w-8 md:w-10 h-8 md:h-10 bg-yellow-500 rounded-3xl border-4 border-slate-800 mr-2"></div>
              </div>
              <div className="h-1 w-full bg-slate-800"></div>
            </div>
            
            <div className="p-4 h-5/6 flex flex-col justify-center items-center">
            
              {start ? (
                <>
                  <p className='text-xl md:text-3xl font-bold leading-8 md:leading-10 px-2 py-4 h-3/4 w-full font-worksans'>{data[nomer].pertanyaan}</p>
                  
                  <button
                    onClick={() => setNo(Math.floor(Math.random() * data.length))}
                    className='bg-teal-400 text-white border-2 border-slate-800 px-10 md:px-12 py-3 mb-2 text-xl md:gtext-2xl font-opensans font-semibold'
                    >
                    TOPIK LAINNYA
                  </button>
                </>
              ) : (
                <>
                  <h1 className='text-xl md:text-3xl font-bold leading-8 md:leading-10 px-2 py-4 h-3/4 w-full font-worksans'>Mulai obrolanmu dengan ratusan topik acak di OBROLIN.</h1>
                
                  <button
                    onClick={() => setStart(true)}
                    className='bg-teal-400 text-white border-2 border-slate-800 px-10 md:px-12 py-3 mb-2 text-xl md:gtext-2xl font-opensans font-semibold'
                    >
                    Mulai
                  </button>
                </>
              )}
  
            {/* <img src="/images/obrolin logo.svg" alt="" className='w-10 h-10 absolute left-3 bottom-3' /> */}
            
            </div>

          </div>
          {/* <div className="absolute bottom-0">
              <div className="flex justify-center px-4 py-2">
              <div className="" onClick={() => copyToClipboard()}>
                <img src="/icons/copy.png" alt="copylink" className='w-8 h-8 mx-4' />
              </div>
              <a href={`https://twitter.com/messages/compose?text=${messages}`} target="_blank" className="">
                <img src="/icons/twitter.png" alt="twitter" className='w-8 h-8 mx-4' />
              </a>
              <a href={`https://api.whatsapp.com/send?text=${messages}`} target="_blank" className="">
                <img src="/icons/whatsapp.png" alt="whatsapp" className='w-8 h-8 mx-4' />  
              </a>

              </div>
            <p>Bagikan website ini ke temanmu</p>

          </div> */}
        </div>
      </main>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise
    const db = client.db("question")

    const data = await db.collection("questions").find({}).toArray()

    return {
      props: { 
        data: JSON.parse(JSON.stringify(data))
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
