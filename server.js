// Required dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/courseModel");

//Express application
const app = express();
const PORT = 3000;

// Fetch all courses from the database
async function getAllCourses() {
  const years = await Course.find();
  let courses = [];
  years.forEach((year) => {
    ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
      if (year[yearKey]) {
        courses.push(...year[yearKey]);
      }
    });
  });
  return courses;
}

app.get("/", (req, res) => {
  res.send("WELCOME TO ROOT ROUTE OF THE API");
});

//get courses sorted by name
app.get("/courses/getCoursesSortedByName", async (req, res) => {
  try {
    const courses = await getAllCourses();
    courses.sort((a, b) => a.description.localeCompare(b.description));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get course names and specializations
app.get("/courses/getCoursesNameAndSpecialization", async (req, res) => {
  try {
    const courses = await getAllCourses();
    const descriptionsAndTags = courses.map((course) => ({
      description: course.description,
      tags: course.tags,
    }));
    res.json(descriptionsAndTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get published courses with specific tags
app.get("/courses/getPublishedCourses", async (req, res) => {
  try {
    const courses = await getAllCourses();
    const descriptionsAndTags = courses
      .filter(
        (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
      )
      .map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
    res.json(descriptionsAndTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mongo-test")
  .then(() => {
    console.log("Connected to MongoDB!");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
