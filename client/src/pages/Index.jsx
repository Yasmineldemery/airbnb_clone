import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
        });
    }, []);
    return (
        <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 &&
                places.map((place) => (
                    <Link to = {"/place/"+ place.placeId} key={place}>
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            <img
                                className="rounded-2xl object-cover aspect-square"
                                src={'http://localhost:4000/uploads/' + place?.photos?.[0]}
                                alt=""
                            />{' '}
                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                ))}
        </div>
    );
}
