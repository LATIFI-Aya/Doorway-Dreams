import React from 'react'
import { categories } from './../assets/data';

const Linstings = () => {
  return (
    <section id='listing' className='max-padd-container py-16 xl:py-32'>
      {/* Title */}
      <div className='text-center pb-16'>
        <h6 className='capitalize'> From concept to reality </h6>
        <h2 className='h2 capitalize'>Discover our newest listings </h2>
      </div>
      {/*  Categories container */}
      <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16' >
        {categories.map((category) => (
          <div key={category.label} className='flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
            <div className='text-secondary rounded-full h-10 w-10 p-2 flexCenter text-lg' style={{backgroundColor: `${category.color}`}}>{category.icon}</div>
            <p className='medium-14'>{category.label}</p>
          </div>
          
        ))}
      </div>
    </section>
  );
};

export default Linstings;