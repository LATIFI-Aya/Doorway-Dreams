import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Loader from '../components/Loader';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FaPersonShelter } from 'react-icons/fa6';
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md';
import { facilities } from '../assets/data';
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

 const ListingDetails = () => { 
    const[loading, setLoading] = useState(true);
    const {listingId} = useParams();
    const [listing, setListing] = useState(null);

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/listing/${listingId}`, {
                method: "GET",
            });

            const data = await response.json();
            setListing(data);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Listing Details Failed", err.message);
        }
    };

    {/* BookingCalendar */}
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleSelect = (ranges) => {
        //Update the selected date range
        setDateRange([ranges.selection]);
    }

    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)
    const dayCount = Math.round(end - start )/(1000 * 60 * 60 * 24); //calculate the diff in day units

    

    useEffect(()=>{
        getListingDetails();
    }, []);

  return loading ? ( <Loader /> ) : (
    <> 
      <Header />
      <section className='max-padd-container flex gap-12 flex-col-reverse xl:flow-row py-10 '>
        {/* Left */}
        <div className='flex-1'>
            <div>
                <h3 className='h3'>{listing.title} </h3>
                <div className='flex items-center gap-x-1 pb-1'>
                    <span> <HiOutlineLocationMarker /></span>
                    <p>{listing.type} in {listing.city}, {listing.province}, {" "} {listing.country} </p>
                </div>
                <div className='flex items-center gap-4 capitalize pt-5'>
                    <span >
                        <FaPersonShelter className='text-xl' />
                        <p className='pt-2'>{listing.guestCount} guests </p> 
                    </span>
                    <span>
                        <MdOutlineBedroomChild className='text-xl' />
                        <p className='pt-2'>{listing.bedroomCount} bedrooms </p> 
                    </span>
                    <span>
                        <MdBed className='text-xl' />
                        <p className='pt-2'>{listing.bedCount} beds </p> 
                    </span>
                    <span>
                        <MdOutlineBathroom className='text-xl' />
                        <p className='pt-2'>{listing.BathroomCount} Bathrooms </p> 
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-x-3 py-6'>
                <img src={`http://localhost:4000/${listing?.creator?.profileImagePath?.replace("public", "")}`} alt="creator" height={44} width={44} className='rounded-full' />
                <h5 className='medium-14 capitalize'>Hosted by {listing.creator.firstName} {listing.creator.lastName} </h5>
            </div>
            <p className='pb-3 '>{listing.description} </p>
            {/*Amenities/Facilities*/}
            <div >
                <h4 className='h-4 py-3'>What this place offers?</h4>
                <ul className='flex items-center flex-wrap gap-3'>
                    {listing.amenities[0].split(",").map((item, i) => (
                        <li key={i} className='flex items-center gap-3 bg-white ring-1 ring-slate-900/5 p-4 rounded'>
                            <div>{facilities.find((f) => f.name === item)?.icon} </div>
                            <p>{item} </p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Booking Calendar*/}
            <div >
                <h4 className='h-4 py-3 my-2' >How long do you want to stay?</h4>
                <DateRange ranges={dateRange} onChange={handleSelect} />
                <div className='flexStart gap-4 flex-wrap py-7'>
                    <div>
                        {dayCount > 1 ? (
                            <div className='flexStart gap-x-2 pt-2'>
                                <h5 className='bold-16 '>Total Stay:</h5>
                                <p className='relative pt-0.5'>MAD{listing.price} x {dayCount} nights </p>
                            </div>
                        ) : (
                            <div className='flexStart gap-x-2 pt-2'>
                                <h5 className='bold-16 '>Total Price:</h5>
                                <p className='relative pt-0.5'>MAD{listing.price} x {dayCount} night </p>
                            </div>
                        )}
                        <div className='flexStart gap-x-2 pt-2'>
                            <h5 className='bold-16 '>Total Price:</h5>
                            <p className='relative pt-0.5'>MAD {listing.price * dayCount} </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-x-3 pt-2'>
                            <span className='bold-15'>Start Date:</span>
                            <p className='relative pt-0.5'>{dateRange[0].startDate.toDateString()}</p>
                        </div>
                        <div className='flex gap-x-3 pt-2'>
                            <span className='bold-15'>End Date:</span>
                            <p className='relative pt-0.5'>{dateRange[0].endDate.toDateString()}</p>
                        </div>
                    </div>
                </div>
                {/*Book Button*/}
                <button type="submit" className='btn-secondary rounded-full flexCenter gap-x-2 capitalize'>Book the visit </button>
            </div>
        </div>
      </section> 
    </>
  )
}

export default ListingDetails;