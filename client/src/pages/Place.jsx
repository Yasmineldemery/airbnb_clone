import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';

export default function Place() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/places/' + id).then((response) => {
                setPlace(response.data);
            });
        }
    }, [id]);

    if (showMore) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
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
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo) => (
                            <div key={photo} className="flex justify-center">
                                <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return !place ? (
        ''
    ) : (
        <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a
                target="_blank"
                className="my-2 block font-semibold underline flex gap-1 my-3"
                href={'https://maps.google.com/?q=' + place.address}
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

                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img
                                    onClick={() => setShowMore(true)}
                                    className="aspect-square object-cover cursor-pointer"
                                    src={'http://localhost:4000/uploads/' + place.photos?.[0]}
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid ">
                        {place.photos?.[1] && (
                            <img
                                onClick={() => setShowMore(true)}
                                className="aspect-square object-cover cursor-pointer"
                                src={'http://localhost:4000/uploads/' + place.photos?.[1]}
                            />
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img
                                    onClick={() => setShowMore(true)}
                                    className="aspect-square object-cover relative top-2 cursor-pointer"
                                    src={'http://localhost:4000/uploads/' + place.photos?.[2]}
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

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4 ">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-2 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}
