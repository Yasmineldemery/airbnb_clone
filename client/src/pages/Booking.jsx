import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Booking() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/bookings/' + id).then((res) => {
            setBooking(res.data);
            console.log(res.data);
            console.log(booking);
        });
    }, [id]);

    if (showMore) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {booking?.place.title}</h2>
                        <button
                            onClick={() => setShowMore(false)}
                            className="right-12 top-8 fixed flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {booking?.place?.photos?.length > 0 &&
                        booking?.place.photos.map((photo) => (
                            <div key={photo} className="flex justify-center">
                                <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking?.place.title}</h1>
            <a
                target="_blank"
                className="my-2 block font-semibold underline flex gap-1 my-3"
                href={'https://maps.google.com/?q=' + booking?.place.address}
                rel="noreferrer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                </svg>

                {booking?.place.address}
            </a>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information: </h2>
                    <div className="flex gap-1 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                        </svg>
                        {differenceInCalendarDays(new Date(booking?.checkOut), new Date(booking?.checkIn))}
                        nights
                        <div className="flex gap-1 items-center ml-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                />
                            </svg>
                            {booking?.checkIn && format(new Date(booking?.checkIn), 'yyyy-MM-dd')}
                        </div>
                        &rarr;
                        <div className="flex gap-1 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                />
                            </svg>
                            {booking?.checkOut && format(new Date(booking?.checkOut), 'yyyy-MM-dd')}
                        </div>
                    </div>
                </div>
                <div className='bg-primary p-6 text-white rounded-2xl'>
                    <div>Total Price</div>
                    <div className='text-3xl'>${booking?.price}</div>
                </div>
            </div>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {booking?.place.photos?.[0] && (
                            <div>
                                <img
                                    onClick={() => setShowMore(true)}
                                    className="aspect-square object-cover cursor-pointer"
                                    src={'http://localhost:4000/uploads/' + booking?.place.photos?.[0]}
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid ">
                        {booking?.place.photos?.[1] && (
                            <img
                                onClick={() => setShowMore(true)}
                                className="aspect-square object-cover cursor-pointer"
                                src={'http://localhost:4000/uploads/' + booking?.place.photos?.[1]}
                            />
                        )}
                        <div className="overflow-hidden">
                            {booking?.place.photos?.[2] && (
                                <img
                                    onClick={() => setShowMore(true)}
                                    className="aspect-square object-cover relative top-2 cursor-pointer"
                                    src={'http://localhost:4000/uploads/' + booking?.place.photos?.[2]}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowMore(true)}
                    className="flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 "
                >
                    <div className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 -mx-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 -mx-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 -mx-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                    </div>
                    Show more Photos
                </button>
            </div>
        </div>
    );
}
