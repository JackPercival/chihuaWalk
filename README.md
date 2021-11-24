# ChihuaWalk

## ChihuaWalk Summary

ChihuaWalk is a fullstack application that allows users to browse dogs, review dogs, and schedule walks with them. The app is a rough clone of AirBnb, but focused on dogs intead of locations. All users can browse dogs on the website and read information about them, as well as search for dogs and view them on a Google Map. Logged in users can upload dogs, add and edit reviews, and schedule walks with other dogs. 

Visit the site at [https://chihuawalk.herokuapp.com/](https://chihuawalk.herokuapp.com/)

## Application Architecture

ChihuaWalk is built on a React frontent and a Flask backend, which uses SQLAlchemy to connect to a PostgreSQL database.

## Frontend Overview

ChihuaWalk uses several technologies on the front end to display and render data.

### Frontend Technologies Used

#### React

ChihuaWalk is a React application. All display logic is determined by React libraries. Some packages used include React-Slideshow, React-Calendar, and @react-google-maps/api. 

#### Redux

ChihuaWalk uses Redux to disaplay and update state throughout the website. Redux is used with thunks to make APIs to the backend server to request and update data. 

#### Google Maps

ChihuaWalk implements the use of Google Maps to display dog locations - both for a single dog and a group of dogs - on an interactable Google Map.  


## Backend Overview

ChihuaWalk uses a Flask server with a PostgreSQL database, and uses SQLAlchemy to retrieve and update data from the database.

### Backend Technologies Used

#### Flask

ChihuaWalk uses Flask as the backend server to handle incoming requests and respond with information from the database.

#### PostgreSQL

I used PostgreSQL as the database, as it is easy to setup and use, especially when making calls with SQLAlchemy.

#### SQLAlchemy

SQLAlchemu was the ORM of choice for JamOut because of how seemlessly it integrates with PostgreSQL and Flask. All database manipulation and seed data was implementing using SQLAlchemy

#### Google Geocoder API

The Google Geocoder API is used whenever a user uploads or edits a dog posting. On form submision, I use the API to determine if the user provided address is valid. If it is valid, the Geocoder API sends back the latitude and longitude of the address, which allows me to plug those coordinates into the front end Google Map, and display the exact location of the dog on the interactable map.
