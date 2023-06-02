interface Location {
    lat: number;
    lng: number;
}

export type InformationBuyer = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    location: Location;
}