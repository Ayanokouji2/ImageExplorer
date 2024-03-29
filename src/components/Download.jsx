import React, { useEffect, useState } from 'react';
import { FcGallery } from 'react-icons/fc';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getImagesFromDb } from '../hooks/Store';
import Loader from './Loader';



function Download() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState()
  const [page, setPage] = useState(1)
  const maxContent = 8
  const [Totalpage,setTotal] = useState();


  async function fetchData() {
    const res = await getImagesFromDb()
    setTotal(res.length)
    setLoading(false)
    setImages(res.slice((page - 1) * maxContent, page * maxContent));

  }

  useEffect(() => {
    fetchData();
    setLoading(true);
  }, [page]);

  const handlePrev = () => {
    if (page !== 1) setPage(page - 1)
  }

  const handleNext = () => {
    if(Totalpage && page<=Totalpage/maxContent)setPage(page + 1)
  }


  return (
    <>
      {
        loading ? <Loader /> : <div>
          <div className='flex items-center gap-2 text-xl'>
            <MdKeyboardDoubleArrowLeft />
            <Link to='/'>Home</Link>
          </div>
          <div className='flex items-center justify-center gap-2 text-2xl border-b-2 border-slate-300 mx-4 py-1.5'>
            <FcGallery />
            <div>Your Downloads</div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
            {images && images.map((item) => {
              const imageUrl = URL.createObjectURL(item.url)
              return (
                <a href={imageUrl} target="_blank" className='d-card shadow-md relative' key={item.id}>
                  <img src={imageUrl} alt={item.id} className='h-72 w-full object-cover rounded-lg p-3' />
                </a>
              );
            })}
          </div>
          <div className="pgn-cont fixed bottom-1 left-[45%] flex items-center">
            <button className='px-4 py-2 bg-blue-300 text-white rounded-md' onClick={handlePrev}>Prev</button>
            <div className='w-10 text-center'>{page}</div>
            <button className='px-4 py-2 bg-blue-300 text-white rounded-md' onClick={handleNext}>Next</button>
          </div>
        </div>
      }
    </>
  );
}

export default Download;
