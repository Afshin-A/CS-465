# Project Summary
There are two parts to the Travlr Getaways application.

First, it requires a user interface for customers to book travel packages. Customers should be able to:
-	Create an account and/or sign in
-	Search/sort travel packages by location and price
-	Book reservations with travel agency
-	Visit the website regularly before their trip to see their itineraries.

Second, Travlr Getaways requires an admin-only interface for system administrators to:
-	Manage customer accounts and orders
-	Manage trip packages 
-	Set prices for items and package

The two components of the Travlr Getaways web application have different requirements. However, the Single-Page Application (SPA) architecture fits both façades of the application. We implement this design using the MEAN (Mongo, Express, Angular, Node.js) stack technology. Our RESTful API (Node.js and Express) take requests from the front end of the application (Angular), collect data (Mongo), generate a response and send it back to the user. 
For the customer side, we want to focus on a smooth and responsive user experience. Users can navigate between different parts of the application, make their selection, view results, and checkout without full-page reloads. This is possible because the SPA architecture is designed to reduce the server load. The client handles most of the rendering locally while the server will primarily focus on processing API requests. Overall, this reduces server load and improves performance as we essentially crowdsource the application from the users.
A similar idea applies to the admin interface. We need a robust and secure application that allows admins to easily manage users and practice business logic.

# Design Constraints
The SPA design is very fast and lightweight. However, it has a few downsides: initial page load speed crawlability, and analytics integration. 
-	SPAs have a slow start up. Initial speed is slow because the client needs to download code to run locally.
-	It makes the website difficult to “crawl”. Search engines usually look at html content of a website to make recommendations, not JavaScript code, and certainly not the code at the backend. In the SPA architecture, most of the content is delivered by JavaScript notation.
-	One of the benefits of SPAs is that the user interface of the application loads only once, and new content sent from the server does not cause the page to refresh. Therefore, browser history and analytics packages (such as user traffic) are difficult to implement. However, there are workarounds using open-source libraries for Angular that make use of the HTML history API (Getting MEAN with Mongo, Express, Angular, and Node, Chapter 2).

# System Architecture
## Component View
The diagram above highlights the necessary components in the Travlr Getaways application. 
-	Client
	-	Client Session – Responsible for managing user sessions
  -	Web Browser – Represents the front end of the application
  - Traveler Portfolio – Represents the user account, responsible for storing user specific data
  - Graphic Library - Used for rendering geographical data as maps 
We can see that the traveler portfolio uses the graphic library and data from the database to present data to the web browser. The web browser depends on the client session to make calls to the server.
- Server
  - Authentication Server – Responsible for verifying user authentication (such as signing in), and authorizing access to other components
  - Traveler Database – Stores system information, such as user data (credentials, payment methods, etc.), travel packages, bookings, etc.
  - Mongoose ODM – Enables interaction with the MongoDB database
  - Server Session – Temporarily stores tokens for user so they can stay signed in
Once the user is authenticated through Authentication Server and Server Session, the server will process requests to access resources stored Traveler Database. The server can also retrieve information stored in the Database
- Database
  - MongoDB – Stores application data

## Sequence Diagram 
A typical use case of our web application is as follows:
A customer wishes to reach a particular endpoint (resource) on our website. He or she will need to open a browser and enters the URL to that end point. In effect, the customer sends a request to access an end point on our backend server. The Node.js application (i.e. our backend server) processes this request by passing it through a sequence of middleware functions that are responsible for tasks such as logging, encoding the URL, extracting cookie information, and more. The request will then match against the router for the URL. The router uses a controller to process the request. The controller contains the logic to connect to the database. With the connection previously established, the controller calls appropriate methods on the data model. This process performs queries on the database an retrieve the requested data. The controller then generates a JSON response and sends it back to the client. At this stage, a view engine will use the response and render the page that the user sees.

## Class Diagram
This section illustrates the JavaScript classes of the web application via a class diagram for the web application.

Starting from the top right side, the diagram depicts the CruiseInfo, FlightInfo, and HotelInfo classes. These classes inherit common characteristics such as the trip date range and destination from the Trip Info class. In addition, the “Info” classes form an aggregation relationship with the Itinerary class, contributing to new information such as the total cost of the trip, total miles traveled, etc. Aggregation is a weak have-a type of relationship, meaning that while they constitute the class Itinerary, they can function independently. Each of the three “Info” classes each have a dependency-type of relationship with their respective “Booking” class. For example, the HotelBooking class uses information from the HotelInfo class as well as the TravelerInfo class to book a hotel. The FlightBooking and CruiseBooking classes have a similar relationship with FlightInfo and CruiseInfo, respectively. Next in the diagram, we have the MemberAccount and Membership_Admin classes that form a generalization (inheritance) relationship. These classes store user information: member number, status, club, frequently used airline, and number of companions. The TravelerInfo class has a aggregation relationship with Membership_Admin. It stores customer financial information, reward programs, and payment validation. Previously, we discussed how this information gets used to book flights, hotels, and cruises. Finally, the centerpiece of the diagram is the class that connects everything together: TravelAgent. This class uses the customers’ information (including payment), itinerary information (hotels, cruises, flights), and makes reservations. 

# Express API Endpoints and Methods
| HTTP Method  | Purpose | URL | Notes
| ------------- | ------------- | ------------- | ------------- |
| GET  |  Returns a list of all available trip packages. This information includes code, name, price, description, image, etc. | `api/trips` | Returns an array of JSON objects. image represents the path to the static files stored locally. |
| GET | Content Cell  | Returns a single trip package that matches the code in the query | `api/trips/code/:tripCode` | If no trip is found, it returns an error. |

# User Interface
This section discusses the user interface in the front-end application for Travlr system administrators. The following screenshots showcase the different pages of the application.
Figure 1 features the home page. This screen provides a list of the travel packages Travlr offers. When logged in, admins will have access to the add trip button. Clicking on this button will open a new page, where a new package can be configured and added to the database. Upon clicking the “save button”, the new package will appear in the home page. This screen is featured in figure 2.

Admins will also have access to an edit button under each travel package. Here, they can update the information for each package. 

In this project, we used the Angular framework to create a single page application (SPA) for the Travlr administrators. This application utilizes the user’s browser to run locally; therefore, the client must download the code before loading the application. An angular application is made up of components and services. These components are reusable and can be dynamically updated. In addition, this application also uses a service to connect to an Express API and retrieve data from a MongoDB database.
We also created the Travlr front-end using Express and Node.js. This project uses an entirely different architecture: the MVC design pattern. To access the site, users first need to request a resource from the back-end server. Using an API, the server will retrieve data from the database to use in generating a view, which is then sent back to the user. As you can see, while both the Angular and Express applications share an API, the process of serving users is entirely different.
As we already mentioned, for an Angular application to run, the client must first download the startup code. This makes Angular applications slow to start, but much faster thereafter. It is overall faster than an Express-powered website because of the constant back and forth requests. However, the load is placed on the server. Such applications must be scalable in preparation for high traffic. A potential disadvantage of Angular applications is that they are not crawlable; consequently, search engines cannot index their contents easily. However, this is not an important factor in the case of the Travlr admin panel.
