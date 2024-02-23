const mongoose = require("mongoose");

// Define the schema for a single course
const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Course code cannot be empty."],
  },
  description: {
    type: String,
    required: [true, "Course description cannot be empty."],
  },
  units: {
    type: Number,
    required: [true, "Units cannot be empty."],
  },
  tags: {
    type: [String],
    required: [true, "Tags field cannot be empty"],
  },
});

// Define the schema for a year, containing courses for each year
const yearSchema = new mongoose.Schema({
  "1st Year": [courseSchema],
  "2nd Year": [courseSchema],
  "3rd Year": [courseSchema],
  "4th Year": [courseSchema],
}, {
  timestamps: true, // Adding timestamps for createdAt and updatedAt fields
});

// Create the Course model using the yearSchema
const Course = mongoose.model("Course", yearSchema);

module.exports = Course;
