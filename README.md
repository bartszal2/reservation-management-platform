# **Platform for managing the booking of rooms and Digital Signage System**

Platform for managing the booking of rooms and the Digital Signage System is a platform that allows you to create meetings with room booking, adding employees, rooms, screens displaying information for given rooms and checking platform statistics.

[Live version of the project](https://bartszal2.github.io/reservation-management-platform)

Additional information about the project:
* The project has
asynchronous simulations of receiving data from the server with loading and error handling created with Promise in Redux Toolkit
* The project stores changed data in localStorage
* The content of the platform is written in Polish

**Contents**
* [Technologies, frameworks and tools](#technologies-frameworks-and-tools)
* [Features](#features)
* [Installation](#installation)

---

## Technologies, frameworks and tools
* HTML
* CSS (using the SASS preprocessor and the BEM methodology)
* JavaScript
* TypeScript
* React
    * React Redux (Redux Toolkit)
    * React Router
<br>

#### [Back to top](#platform-for-managing-the-booking-of-rooms-and-digital-signage-system)
---

## Features
The most important functionalities of the platform can be found below!

* CRUD (read: 'Create, Read, Update, Delete') Meeting (forms with validation)
    * Examples of validation options: 
        * You cannot add meetings when another meetings is already in progress
        * You can only add active employees
        * You can only add active rooms
* Search, sort and filter meetings data
* Display the current meeting status in the list
* CRUD Employee (forms with validation)
* Search, sort and filter employeeres data
* CRUD Room (forms with validation)
* Search, sort and filter rooms data
* CRUD Screen (forms with validation)
* Search, sort and filter screens data 
* CRUD Meeting category
* CRUD Type of room
* CRUD Employee position
* Digital Signage System - Screens displaying content for given rooms
    * **Attention! Screens work only on screens and browser windows in 1920px / 1080px or 1080px / 1920px resolution (one of the guidelines for creating the platform).**
    * Displaying only active screens
    * Room name
    * Current room status
    * Status: BUSY (meeting in progress): Information about the meeting and the countdown to the end of the meeting
    * List of upcoming meetings for a given room
    * Automatic screen refresh every 5 minutes
* Printing a list with data (meetings, rooms, employees, screens)
* Notification panel informing about a new, updated or deleted item
    * Counter of unread notifications
    * Clicking on a notification will make it read or unread
* Platform mode (light / dark)
* Platform statistics displayed on the Dashboard page
* Responsive Web Design

<br>

#### [Back to top](#platform-for-managing-the-booking-of-rooms-and-digital-signage-system)
---

## Installation
In the source code editor, navigate to the folder containing the project source.
#### `cd ../reservation-management-platform/src`

Install the dependencies needed to run the application.
#### `npm install`

Launch the app!
#### `npm start`
<br>

#### [Back to top](#platform-for-managing-the-booking-of-rooms-and-digital-signage-system)
