import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

 const ListingCard = ({ listingId, creator, listingPhotoPaths, city, province, country, category, type, price, title, description, }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex  - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
    };

  return (
    <div onClick={()=>navigate(`/listing/${listingId}`)} className='grid grid-cols-1 xl:grid-cols-2 gap-6 palce-items-center ring-1 ring-slate-900/5 bg-white cursor-pointer p-2.5 rounded-[2.5rem] relative group'>
        {/* Image */}
        <div className='overflow-hidden relative'>
            <div className='flex' style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {listingPhotoPaths?.map((photo, i)=> (
                    <div key={i} className='relative flex-none w-full h-[266px] items-center'>
                        <img src={`http://localhost:4000/${photo.replace("public","")}`} alt={`photo ${i + 1}`} className='h-full w-full rounded-[2rem]'/>
                        {/* Images slide Arrows */}
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-1000'>
                            <div>
                                <FaArrowLeft onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevSlide(e);
                                } } className='absolute top-1/2  left-2.5 transform -translate-y-1/2 p-1.5 text-2xl rounded-full border-full border-none cursor-pointer flexCenter bg-white/30 text-white z-50' />
                            </div>
                            <div>
                                <FaArrowRight onClick={(e) => {
                                    e.stopPropagation();
                                    goToNextSlide(e);
                                } } className='absolute top-1/2 right-2.5 transform -translate-y-1/2 p-1.5 text-2xl rounded-full border-full border-none cursor-pointer flexCenter bg-white/30 text-white z-50' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Title & Description info */}
        <div className='max-sm:px-2 '>
            <h4 className='h4'>{title} </h4>
            <div className='bold-16 pd-2'>{category}</div>
            <h5 className='flex items-center gap-x-2 capitalize medium-15'> <HiOutlineLocationMarker /> 
            {city}, {province}, {country}
            </h5>
            <div className='mt-2'>
                <div>
                    <span className='text-secondary bold-22'>MAD{price}</span>
                    <span className='medium-14 '>/ night</span>
                </div>
                <div className='medium-15 captalize py-1'>{type} </div>
            </div>
            <p className='line-clamp-4'>{description} </p>
        </div>
    </div>
  );
};

export default ListingCard;