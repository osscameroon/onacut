CREATE TABLE quartier (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
CREATE TABLE quartier_location (
	location_id INTEGER, 
	quartier_id INTEGER, 
	FOREIGN KEY(location_id) REFERENCES location (id), 
	FOREIGN KEY(quartier_id) REFERENCES quartier (id)
);
CREATE TABLE location (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	asciiname VARCHAR(255), 
	alternativenames TEXT, 
	longitude FLOAT, 
	lattitude FLOAT, 
	PRIMARY KEY (id)
);
CREATE TABLE region (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
CREATE TABLE region_location (
	location_id INTEGER, 
	region_id INTEGER, 
	FOREIGN KEY(location_id) REFERENCES location (id), 
	FOREIGN KEY(region_id) REFERENCES region (id)
);
CREATE TABLE city (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	region_id INTEGER, 
	longitude FLOAT, 
	lattitude FLOAT, 
	PRIMARY KEY (id), 
	FOREIGN KEY(region_id) REFERENCES region (id)
);
CREATE TABLE city_location (
	location_id INTEGER, 
	city_id INTEGER, 
	FOREIGN KEY(location_id) REFERENCES location (id), 
	FOREIGN KEY(city_id) REFERENCES city (id)
);
CREATE TABLE district (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	city_id INTEGER, 
	PRIMARY KEY (id), 
	UNIQUE (name), 
	FOREIGN KEY(city_id) REFERENCES city (id)
);
CREATE TABLE district_location (
	location_id INTEGER, 
	district_id INTEGER, 
	FOREIGN KEY(location_id) REFERENCES location (id), 
	FOREIGN KEY(district_id) REFERENCES district (id)
);
CREATE TABLE alert (
	id INTEGER NOT NULL, 
	observations VARCHAR(255), 
	type VARCHAR(50) NOT NULL, 
	date DATE NOT NULL, 
	begin_time TIME NOT NULL, 
	end_time TIME NOT NULL, 
	region_id INTEGER, 
	longitude FLOAT, 
	lattitude FLOAT, 
	city_id INTEGER, 
	district_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(region_id) REFERENCES region (id), 
	FOREIGN KEY(city_id) REFERENCES city (id), 
	FOREIGN KEY(district_id) REFERENCES district (id)
);
