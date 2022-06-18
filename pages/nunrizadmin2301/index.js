import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function index({ data }) {
  const [editId, setEditId] = useState(0);
  const [sortedData, setSortedData] = useState(data);
  const [deleteConf, setDeleteConf] = useState(false);
  const [verified, setVerified] = useState(false);

  const [form, setForm] = useState({
    "pertanyaan": ""
  })
  
  const handleChange = (e) => {
    setForm({ ...form, "pertanyaan": e.target.value })
  }

  const editQuestion = (question) => {
    setEditId(question._id)

    setForm({ ...form, "pertanyaan": question.pertanyaan })
  }

  const handleSearch = (e) => {
    const inputValue = e.target.value

    const result = data.filter(res => {
      if (inputValue == "") {
        return res;
      } else {
        return res.pertanyaan.toLowerCase().includes(inputValue.toLowerCase());
      }
    })

    setSortedData(result)
  }

  const addQuestion = async () => {
    let question = {pertanyaan: form.pertanyaan}

    let res = await fetch('/api/admin-obrolin', {
      method: 'POST',
      body: JSON.stringify(question)
    })

    if (res.status == 201) {
      toast.success("Question added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      location.reload()
    }
    
  }

  const updateQuestion = async () => {
    let updatedData = { id: editId, pertanyaan: form.pertanyaan }
    
    let res = await fetch('/api/admin-obrolin', {
      method: 'PUT',
      body: JSON.stringify(updatedData)
    })

    if (res.status == 200) {
      toast.success("Question updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      location.reload()
    }
  }

  const deleteQuestion = async (id) => {
    let res = await fetch('/api/admin-obrolin', {
      method: 'DELETE',
      body: JSON.stringify({id})
    })

    if (res.status == 200) {
      toast.success("Question deleted successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      location.reload()
    }
  }
  
  useEffect(() => {
    setSortedData(data)
  }, [data])

  if (!verified) {
    return (
      <div className="absolute bottom-0 right-0">
        <input type="password" onChange={(e) => {
          if (e.target.value === process.env.NEXT_PUBLIC_ADMIN_PASS) setVerified(true)
        }} />
      </div>
    )
  }

  return (
    <div className='w-3/4 mx-auto my-8'>
      <h1 className='font-bold text-3xl mb-4'>Data Management</h1>

      <div className="my-4">
        <h2 className='font-semibold text-xl'>Data Random Topic Generator</h2>

        {/* Adding new Question */}
        <div className="border p-2 mb-2">
          <h1 className='font-semibold mb-2'>Add New Question</h1>
          <div className="flex">
            <input
              type="text"
              onFocus={(e) => { setEditId(0); setForm({ ...form, 'pertanyaan': e.target.value }) }}
              onChange={(e) => handleChange(e)}
              className='w-full mr-2 focus:outline-none bg-transparent border-b-[1px] border-teal-500'
            />
            <button className='bg-teal-600 px-4 text-white' onClick={() => addQuestion() }>Add</button>
          </div>
        </div>

        {/* Search Question */}
        <div className="border p-2">
          <h1 className='font-semibold mb-2'>Search Question</h1>
          <div className="flex">
            <input
              type="text"
              onChange={e => handleSearch(e)}
              className='w-full mr-2 focus:outline-none bg-transparent border-b-[1px] border-teal-500'
            />
          </div>
        </div>

        <div className="flex justify-between mt-4 border-b">
          <p className='text-sm text-slate-500'>Question</p>
          <div className="flex">
            
            <button onClick={() => setSortedData([...data].reverse())} className="block bg-slate-400 text-white text-sm px-2 mr-2">New on top</button>
            <button onClick={() => setSortedData(data)} className=' bg-slate-400 text-white text-sm px-2'>Old on top</button>
          </div>
        </div>

        {/* Display Question Data */}
        <div className="mt-2 mb-48">
          {sortedData.map((question, i) => (
            <div key={i}>
              <div className="block border p-2 mb-2">
                <div className="">
                  <div className="flex justify-between">
                    <p className=''>{ i+1 }. {question.pertanyaan}</p>
                      
                    <div className="flex gap-x-1">
                      <button
                        className='bg-emerald-600 px-4 text-white'
                        onClick={() => editQuestion(question)}
                      >Edit</button>
                      <button className='bg-red-600 px-4 text-white' onClick={() => { setDeleteConf(true);  setEditId(question._id)}}>Delete</button>
                    </div>
                  </div>
                  
                {/* Update Question */}
                {editId === question._id && !deleteConf ? (
                  <div className='block bg-slate-100 p-4 mt-2'>
                    <input
                      type="text"
                      className='focus:outline-none bg-transparent border-b-[1px] border-teal-500 w-full'
                      value={form.pertanyaan}
                      onChange={(e) => handleChange(e)}
                    />
                    
                    <div className="flex mt-2 gap-x-2">
                      <button className='bg-teal-600 px-4 text-white' onClick={() => updateQuestion() }>save</button>
                      <button
                      className='bg-white px-4 text-black'
                      onClick={() => setEditId(0)}
                      >cancel</button>
                    </div>
                  </div>
                ) : editId === question._id && deleteConf ? (
                  <div className="block bg-slate-100 p-4 mt-2">
                    <p>Are you sure you want to delete this question?</p>    
                    <div className="flex mt-2 gap-x-2">
                      <button className='bg-red-600 px-4 text-white' onClick={() => deleteQuestion(question._id) }>Delete</button>
                      <button
                      className='bg-white px-4 text-black'
                      onClick={() => setEditId(0)}
                      >cancel</button>
                    </div>
                  </div>
                ) : ""}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export async function getServerSideProps() {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/admin-obrolin`);
  // extract the data
  let data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
