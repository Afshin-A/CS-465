// this file defines the mongoose schemas for locations in the mongodb database
// NOTE: This file is just for keeping notes from the book Getting MEAN.
// It's not part of the travlr app
const mongoose = require('mongoose');

// defining a sub schema for operation hours for each location
// we'll use inside this in the locationSchema
const openingTimeSchema = new mongoose.Schema({
    days: {
      type: String,
      required: true
    },
    opening: String,
    closing: String,
    closed: {
      type: Boolean,
      required: true
    }
  });


  // defining a sub-schema for the reviews for each location
  // we'll use this inside the location schema
  const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    reviewText: String,
    createdOn: {
      type: Date,
      'default': Date.now
    }
  });


// defining the main schema for the locations database
const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true // input validation
        },
        address: String,
        rating: {
            type: Number,
            'default': 0, // it's good practice to wrap default in quotes because it is a js keyword
            min: 0,
            max: 5
        }, 
        facilities: [String], //array of strings
        // GeoJSON data. See below for example of acceptable input
        coords: {
            type: {
                type: String,
                enum: ['Point'],  // Must be 'Point'. Other types include: LineString, Polygon
                required: true    // This field must be present
            },
            coordinates: {
                type: [Number],   // Array of numbers
                required: true    // This field must be present
            }
        },
        openingTimes: {
            type: [openingTimeSchema],
            required: true
        },
        reviews: [reviewSchema]
    }
);

/**
 * Example entry for coords according to the schema would be
 {
  coords: {
    type: 'Point',
    coordinates: [2.2945, 48.8584] // Longitude and latitude for the Eiffel Tower
  }
}

 */

//allows for efficient querying of spherical geometries.
//allows MongoDB to calculate geometries based on a spherical object
locationSchema.index({coords: '2dsphere'});

// compiling the model
// mongoose is connection name
// Location is what we're naming the model
// locationSchema is the name of the schema
// and Locations is the name of the collection in the database we want to push the data to 
mongoose.model('Location', locationSchema, 'Locations');

