import React, { useState } from 'react';
import { categories, facilities, types } from '../assets/data';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import {IoIosImages } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';


 const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [photos, setPhotos] = useState([]);

    // counts
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const handleUploadPhoto = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [
            ...prevPhotos, ...newPhotos])
        }

    const handleDragPhoto = (result) => {
        if (!result.destination) return;
        const items = Array.from(photos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPhotos(items);
    }


    const handleRemotePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
    }
    const handleAddPhoto = (e) => {

    const handlePost = async (e) => {
        e.preventDefault();
    };

  return (
    <>
      <Header />
      <section className='max-padd-container py-10'>
        <h3 className='h3'> Add a Property </h3>
        <form onSubmit={handlePost}>
            <h4 className='h4 my-4'>Describe Your Property</h4>
            {/*  Categories container */}
                <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-8' >
                    {categories.map((item) => (
                      <div key={item.label} onClick={() => setCategory(item.label)} className='flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
                        <div className='text-secondary rounded-full h-10 w-10 p-2 flexCenter text-lg' style={{backgroundColor: `${item.color}`}}>{item.icon}</div>
                        
                        <p className={`${category === item.label ? "text-secondary": ""} medium-14`}>{item.label}</p>
                      </div>
                    ))}
                </div>
                {/* container Types and locations */}
                <div className='flex flex-col gap-x-16 xl:flew-row'>
                    <div className='flex-1'>
                        {/*Types of place */}
                        <h4 className='h4 my-4'>What is the type of your place?</h4>
                        <div className='flex flex-col gap-y-3 mb-6'>
                            {types.map((item) => (
                                <div key={item.name} className={`${type === item.name ? "ring-1 ring-slate-900/50" : "ring-1 ring-slate-900/5"} flexbetween max-w-[777px] rounded-xl px-4 py-1`}>
                                    <div>
                                        <h5 className='h5' >{item.name}</h5>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className='text-2xl'>{item.icon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* place locations  */}
                    <div className='flex-1 mb-4'>
                        <h4 className='h4 my-4'>what's the address of your place? </h4>
                        <div>
                            <div>
                                <h5 className='h5'>Street Adress:</h5>
                                <input type="text" name='streetAddress' placeholder='Street' required className='bg-white text-sm outline-none border-none mb-2 rounded' />
                            </div>
                        </div>
                        <div className='flex gap-6 '>
                            <div className='w-1/2'>
                                <h5 className='h5'>Apartment, Suite (opt):</h5>
                                <input type="text" name='aptSuite' placeholder='Apt, Suite (opt)' required className='bg-white text-sm outline-none border-none mb-2 rounded' />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='h5'>City:</h5>
                                <input type="text" name='city' placeholder='City' required className='bg-white text-sm outline-none border-none mb-2 rounded' />
                            </div>
                        </div>
                        <div className='flex gap-6 '>
                            <div className='w-1/2'>
                                <h5 className='h5'>Province</h5>
                                <input type="text" name='province' placeholder='Province' required className='bg-white text-sm outline-none border-none mb-2 rounded' />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='h5'>Country:</h5>
                                <input type="text" name='country' placeholder='Country' required className='bg-white text-sm outline-none border-none mb-2 rounded' />
                            </div>
                        </div>
                    </div>
                </div>
            {/*  Essentials */} 
            <h4 className='h4 my-4'>Provide some essentials details about your place?</h4>  
            <div className='flex flex-wrap gap-4 mb-6'>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Guests</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => (
                            guestCount > 1 && setGuestCount(guestCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{guestCount} </p>
                        <FaPlus onClick={() => setGuestCount(guestCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Bedrooms</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bedroomCount > 1 && setBedroomCount(bedroomCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bedroomCount} </p>
                        <FaPlus onClick={() => setBedroomCount(bedroomCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>Beds</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bedCount > 1 && setBedCount(bedCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bedCount} </p>
                        <FaPlus onClick={() => setBedCount(bedCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 py-2 rounded'>
                    <h5>bathrooms</h5>
                    <div className='flexCenter gap-x-2 bg-white'>
                        <FaMinus onClick={() => ( bathroomCount > 1 && setBathroomCount(bathroomCount - 1) )} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                            <p>{bathroomCount} </p>
                        <FaPlus onClick={() => setBathroomCount (bathroomCount + 1)} className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <h4 className='h4 my-4'>Describe about the features of your location? </h4>
                <ul className='flex items-center flex-wrap gap-3 mb-10'>
                    {facilities.map((card)=>(
                        <li key={card.name} onClick={() => {}} className={`ring-1 ring-slate-900/5 flex items-center gap-3 bg-white p-4 rounded cursor-default`}>
                            <div>{card.icon} </div>
                            <p>{card.name}</p>
                        </li>
                    ))}
                </ul>
                {/* upload image */}
                <h4 className='h-4 m-6'>Include images showcasing your property?</h4>
                <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable></Droppable>
                </DragDropContext>
            </div> 
        </form>
      </section>
    </>
  )
}

export default CreateListing;