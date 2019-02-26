/**
 * API_KEY = 7a3225c4433be6b4875e5b50daa5ce92  
 */

 export interface Coord {
	lat: number;
	lon: number;
}

export interface Main {
	temp: number;
	pressure: number;
	humidity: number;
	temp_min: number;
	temp_max: number;
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface Sy {
	country: string;
}

export interface Cloud {
	all: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface List {
	id: number;
	name: string;
	coord: Coord;
	main: Main;
	dt: number;
	wind: Wind;
	sys: Sy;
	rain?: any;
	snow?: any;
	dt_txt: string;
	clouds: Cloud;
	weather: Weather[];
}

export interface City {
	id: number;
	name: string;
	coord: Coord;
	country: string;
}

export interface CityInfo {
	message: string;
	cod: string;
	count: number;
	list: List[];
	city?: City;
}




