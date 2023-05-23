import axios from 'axios';
import { useCallback, useState } from 'react';
import Map, {
	LngLat,
	Marker,
	MarkerDragEvent,
	NavigationControl,
} from 'react-map-gl';

interface MapComponentProps {
	setAddress: (address: string) => void;
	setLocation: (location: any) => void;
	setCity: (city: string) => void;
	setCountry: (country: string) => void;
	setZipCode: (zipCode: string) => void;
	setState: (state: string) => void;
}

const MapComponent = ({
	setAddress,
	setLocation,
	setCity,
	setCountry,
	setZipCode,
	setState,
}: MapComponentProps) => {
	const [newPlace, setNewPlace] = useState<any>(null);
	const [viewport] = useState({
		latitude: -26.808285,
		longitude: -65.21759,
		zoom: 2,
	});

	const [, logEvents] = useState<Record<string, LngLat>>({});

	const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
		logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
	}, []);

	const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
		logEvents(_events => ({ ..._events, onDrag: event.lngLat }));

		setNewPlace({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat,
		});
	}, []);

	const onMarkerDragEnd = useCallback(async (event: MarkerDragEvent) => {
		logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));

		const longitude = event.lngLat.lng;
		const latitude = event.lngLat.lat;

		const data = await axios
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
					import.meta.env.VITE_MAPBOX_TOKEN
				}`
			)
			.then(res => res.data);

		setAddress(data.features[0].place_name.split(',')[0]);
		setLocation({
			type: 'Point',
			coordinates: [longitude, latitude],
		});

		setCity(data.features[0].place_name.split(', ')[1]);
		setState(data.features[0].place_name.split(', ')[2]);
		setCountry(
			data.features[0].place_name.split(', ')[
				data.features[0].place_name.split(',').length - 1
			]
		);

		setNewPlace({
			longitude,
			latitude,
		});
	}, []);

	const onClick = useCallback(async (event: any) => {
		logEvents(_events => ({ ..._events, onClick: event.lngLat }));

		const longitude = event.lngLat.lng;
		const latitude = event.lngLat.lat;

		const data = await axios
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
					import.meta.env.VITE_MAPBOX_TOKEN
				}`
			)
			.then(res => res.data);

		console.log(data);

		setAddress(data.features[0].place_name.split(',')[0]);
		setLocation({
			type: 'Point',
			coordinates: [longitude, latitude],
		});

		const arr = ['place', 'postcode', 'country', 'region'];

		data.features[0].context.forEach((context: any) => {
			if (arr.includes(context.id.split('.')[0])) {
				if (context.id.split('.')[0] === 'place') {
					setCity(context.text);
				} else if (context.id.split('.')[0] === 'postcode') {
					setZipCode(context.text);
				} else if (context.id.split('.')[0] === 'country') {
					setCountry(context.text);
				} else if (context.id.split('.')[0] === 'region') {
					setState(context.text);
				}
			}
		});

		setNewPlace({
			longitude,
			latitude,
		});
	}, []);

	return (
		<Map
			initialViewState={viewport}
			mapStyle='mapbox://styles/matiaspp96/clhqjiw6y03hj01qnbjhj8m59'
			mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
			onClick={onClick}
			attributionControl
		>
			{newPlace && (
				<Marker
					latitude={newPlace.latitude}
					longitude={newPlace.longitude}
					anchor='bottom'
					onDragStart={onMarkerDragStart}
					onDrag={onMarkerDrag}
					onDragEnd={onMarkerDragEnd}
					draggable
				>
					<svg
						className='w-10 h-10'
						fill='none'
						stroke='url(#grad1)'
						viewBox='0 0 15 15'
						xmlns='http://www.w3.org/2000/svg'
					>
						<defs>
							<linearGradient id='grad1' x1='0%' y1='0%' x2='0%' y2='100%'>
								<stop
									offset='0%'
									style={{ stopColor: '#e72a53', stopOpacity: 1 }}
								/>
								<stop
									offset='100%'
									style={{ stopColor: '#dd86a4', stopOpacity: 1 }}
								/>
							</linearGradient>
						</defs>
						<path
							d='M10 3.5C10 4.70948 9.14112 5.71836 8 5.94999V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.94999C5.85888 5.71836 5 4.70948 5 3.5C5 2.11929 6.11929 1 7.5 1C8.88071 1 10 2.11929 10 3.5Z'
							fill='currentColor'
							fillRule='evenodd'
							clipRule='evenodd'
						></path>
					</svg>
				</Marker>
			)}
			<NavigationControl />
		</Map>
	);
};
export default MapComponent;
