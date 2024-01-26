import React, { useEffect, useState } from 'react';
import { FcGallery } from 'react-icons/fc';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getAllImagesFromDB } from '../hooks/Store';
import Loader from './Loader';



function Download() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState()

  async function fetchData(setImages) {
    const databaseName = 'ImageDatabase';
    const storeName = 'Images';
    const response = await getAllImagesFromDB(databaseName, storeName);
    setLoading(false);
    setImages(response);
  }

  useEffect(() => {
    fetchData(setImages);
    setLoading(true);
  }, []);

  
  return (
    <>
      {
        loading ? <Loader /> : <div>
          <div className='flex items-center gap-2 text-xl'>
            <MdKeyboardDoubleArrowLeft />
            <Link to='/'>Home</Link>
          </div>
          <div className='flex items-center justify-center gap-2 text-2xl border-b-2 border-slate-300 mx-4 py-2'>
            <FcGallery />
            <div>Your Downloads</div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
            {images && images.map((item) => {
              return (
                <div className='d-card shadow-md relative' key={item.key}>
                  <img src={item.url} alt={item.key} className='h-72 w-full object-cover rounded-lg p-3' />
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}

export default Download;