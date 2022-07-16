import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function index({ data }) {
  const [editId, setEditId] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [deleteConf, setDeleteConf] = useState(false);
  const [verified, setVerified] = useState(false);

  const [form, setForm] = useState({
    "pertanyaan": "",
    "kategori": ""
  })
  const [filter, setFilter] = useState({
    kategori: "all",
    sort: "old"
  })

  const handleFilter = (e) => {
    const value = e.target.value
    const name = e.target.name

    console.log(name, value)
    setFilter({ ...filter, [name]: value })
  }
  
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setForm({ ...form, [name]: value })
  }

  const editQuestion = (question) => {
    setEditId(question._id)
    const category = "santai"
      
    setForm({ ...form, "pertanyaan": question.pertanyaan, "kategori": question.kategori ? question.kategori : category })
  }

  const handleSearch = (e) => {
    const inputValue = e.target.value

    const result = filteredData.filter(res => {
      if (inputValue == "") {
        return res;
      } else {
        return res.pertanyaan.toLowerCase().includes(inputValue.toLowerCase());
      }
    })

    setFilteredData(result)
  }

  const addQuestion = async () => {
    let question = {pertanyaan: form.pertanyaan, kategori: form.kategori}

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
    let updatedData = { id: editId, pertanyaan: form.pertanyaan, kategori: form.kategori }

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

    setEditId(0);
    setDeleteConf(false);
  }
  
  const giveCredentials = () => {
    setVerified(true)

    const item = {
      status: true,
      expiry: new Date().getTime() + 3600000,
    }
    localStorage.setItem("key", JSON.stringify(item))
  }

  function getCredentials() {
    const itemStr = localStorage.getItem("key")
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    // compare the expiry time of the item with the current time
    if (new Date().getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem("key")
      
      return null
    }

    setVerified(item.status)

  }
  
  useEffect(() => {
    setFilteredData(data)
    getCredentials()
  }, [data])

  useEffect(() => {
    let filteredData = data;

    if (filter.sort == 'new') filteredData = [...data].reverse()
    
    switch (filter.kategori) {
      case 'santai':
        filteredData = filteredData.filter((e) => e.kategori == 'santai')
        break;
      
      case 'asmara':
        filteredData = filteredData.filter((e) => e.kategori == 'asmara')
        break;
      
      case 'deeptalk':
        filteredData = filteredData.filter((e) => e.kategori == 'deeptalk')
        break;
      
      default:
        filteredData
        break;
    }
        
    setFilteredData(filteredData)
  }, [filter])

  if (!verified) {
    return (
      <div className="absolute bottom-0 right-0">
        <input type="password" onChange={(e) => {
          if (e.target.value === process.env.NEXT_PUBLIC_ADMIN_PASS) giveCredentials()
        }} />
      </div>
    )
  }

  return (
    <div className='w-3/4 mx-auto my-8'>
      <h1 className='font-bold text-3xl mb-4'>Data Management</h1>

      <div className="my-4">
        <h2 className='font-semibold text-xl'>Data Random Topic Generator</h2>

        <div className="mb-4">
          <p>Jumlah Data</p>
          <h1 className='font-bold text-3xl'>{ filteredData.length }</h1>
        </div>

        {/* Adding new Question */}
        <div className="border p-2 mb-2">
          <h1 className='font-semibold mb-2'>Add New Question</h1>
          <div className="flex">
            <div className="flex flex-col w-full pr-2">
              <label htmlFor="pertanyaan" className=' text-sm text-slate-500'>Pertanyaan</label>
              <input
                type="text"
                onFocus={(e) => { setEditId(0); setForm({ ...form, 'pertanyaan': e.target.value }) }}
                onChange={(e) => handleChange(e)}
                className='w-full mr-2 focus:outline-none bg-transparent border-b-[1px] border-teal-500'
              />

              <label htmlFor="kategori" className='block text-sm text-slate-500 mt-4 mb-1'>Select a category</label>
              <select name="kategori" id="kategori" onChange={(e) => handleChange(e)} className='mb-2 focus:outline-none bg-transparent border-b-[1px] border-teal-500'>
                <option value="santai">santai</option>  
                <option value="asmara">asmara</option>  
                <option value="deeptalk">deeptalk</option>  
              </select>
            </div>
            
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

        {/* Filter */}
        <div className='flex justify-between mt-4 border-b text-sm text-slate-500'>
          <p className=''>Question</p>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1 mr-1">
              <input type="checkbox" name="showKategori" id="showKategori" />
              <label htmlFor="showKategori">Show Kategori</label>
            </div>
            <select name="kategori" id="kategori" onChange={(e) => handleFilter(e)} className='focus:outline-none border-[1px] border-slate-700'>
              <option value="all">Semua</option>
              <option value="santai">Santai</option>
              <option value="asmara">Asmara</option>
              <option value="deeptalk">Deeptalk</option>
            </select>
            <select name="sort" id="sort" onChange={(e) => handleFilter(e)} className='focus:outline-none border-[1px] border-slate-700'>
              <option value="old">Old on top</option>
              <option value="new">New on top</option>
            </select>
            {/* <button onClick={() => setSortedData([...data].reverse())} className="block bg-slate-400 text-white text-sm px-2 mr-2">New on top</button>
            <button onClick={() => setSortedData(data)} className=' bg-slate-400 text-white text-sm px-2'>Old on top</button> */}
          </div>
        </div>

        {/* Display Question Data */}
        <div className="mt-2 mb-48">
          {filteredData.map((question, i) => (
            <div key={i}>
              <div className="block border p-2 mb-2">
                <div className="">
                  {/* kategori */}
                  {question.kategori === 'santai' ? (
                    <p className="block text-sm text-orange-500">{ question.kategori }</p>
                  ) : question.kategori === 'asmara' ? (
                    <p className="block text-sm text-pink-500">{ question.kategori }</p>
                  ) : question.kategori === 'deeptalk' ? (
                    <p className="block text-sm text-teal-500">{ question.kategori }</p>
                  ) : ''}
                  
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
                    <label htmlFor="pertanyaan" className=' text-sm text-slate-500'>Pertanyaan</label>
                    <input
                      type="text"
                      name='pertanyaan'
                      id='pertanyaan'
                      className='focus:outline-none bg-transparent border-b-[1px] border-teal-500 w-full'
                      value={form.pertanyaan}
                      onChange={(e) => handleChange(e)}
                    />
                      
                    <label htmlFor="kategori" className='block text-sm text-slate-500 mt-4 mb-1'>Select a category</label>
                    <select name="kategori" id="kategori" onChange={(e) => handleChange(e)} className='mb-2'>
                      <option value="santai">santai</option>  
                      <option value="asmara">asmara</option>  
                      <option value="deeptalk">deeptalk</option>  
                    </select>
                    
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
