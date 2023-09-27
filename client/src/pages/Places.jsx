import { Link } from 'react-router-dom';
import AccountNavigation from '../AccountNavigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Places() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios
            .get('/user-places')
            .then(({ data }) => {
                setPlaces(data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <AccountNavigation />
            <div className="text-center">
                <Link
                    className=" inline-flex gap-1 bg-primary text-white padding-y2 px-6 py-1 rounded-full "
                    to={'/account/places/new'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 &&
                    places.map((place) => (
                        <Link
                            to={'/account/places/' + place.placeId}
                            key={place}
                            className="flex  cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
                        >
                            <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                                {place.photos.length > 0 && (
                                    <img
                                        className="object-cover"
                                        src={'http://localhost:4000/uploads/' + place.photos[0]}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}