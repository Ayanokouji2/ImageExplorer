import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GoDownload } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md"
import { Link } from 'react-router-dom';
import performTransaction from '../hooks/Store'
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Images() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("");

  const notify = () => toast.success("Downaloaded successfully!", { autoClose: 500, pauseOnHover: false, draggable: false });
  const handlePrevious = (e) => {
    e.preventDefault();
    if (page !== 1) setPage(page - 1)
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (page != 7) setPage(page + 1)
  }

  const fetchImage = async (e) => {

    try {

      setLoading(true);
      const res = await axios(
        `https://api.unsplash.com/search/photos?page=${page}&query=${searchText || "bikes"}&client_id=${process.env.API_KEY}`
      );
      setLoading(false)
      const ImageData = await res.data.results;
      setImages(ImageData);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleSearchText = (e) => setSearchText(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImage();
  }

  useEffect(() => {
    fetchImage();
    setLoading(false)
  }, [page])


  const handleDownload = async (id, ImageUrl) => {
    const res = await fetch(ImageUrl);
    const blob = await res.blob()
    console.log("Blob ",blob);

    performTransaction({ id: id, url: blob })
    notify()
  }



  return (
    <>
      {loading ? <Loader /> : <div>
        <ToastContainer />
        <div className='search-cont flex items-center justify-center py-3 border-solid border-b-2'>
          <input onChange={handleSearchText} type="text" className='px-2 py-3 outline-none bg-slate-300  md:w-[25rem] text-slate-800 font-bold' placeholder='Search Your Imagination...' />
          <button className='bg-[#003049] text-white px-3 py-3 ' onClick={handleClick}>Search Now</button>
        </div>
        <div className='flex justify-end   text-xl px-4'>
          <div className='group flex items-center'>
            <Link to='/downloads' className=''>Go to Downloads</Link>
            <MdKeyboardDoubleArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
          </div>
        </div>
        <div className="image-cont grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:p-10 ">
          {
            images.map(item => (
              <div className='card shadow-md  relative ' key={item.id}>
                <img src={item.urls.small} alt={item.alt_description} className='h-72 w-full object-cover rounded-lg p-3' />
                <div className="action-btn absolute bottom-[45%] left-[45%] p-1 rounded bg-white">
                  <GoDownload className='text-3xl ' onClick={() => handleDownload(item.id, item.urls.large)} />

                </div>
              </div>

            ))
          }
        </div>
        <div className="page-cont flex items-center gap-5 my-10  justify-center">
          <button onClick={handlePrevious} className="prev bg-blue-300 shadow-xl rounded px-3 py-2">Prev</button>
          <div className=''>{page}</div>
          <button onClick={handleNext} className="next bg-blue-300 shadow-xl rounded px-3 py-2">Next</button>
        </div>
      </div>}
    </>
  )
}

export default Images
