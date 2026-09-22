# 🎓 Student Course Manager

A beginner-friendly **MongoDB + Node.js** project built to learn and practice MongoDB through a real-world student management use case.

The project demonstrates **CRUD operations, MongoDB aggregation pipelines, course analytics, and `$lookup` between collections**.

## 🚀 Features

* Add student records
* View all students
* Store student skills
* Manage course information
* Count students by course
* Calculate average marks
* Find high-scoring students
* Calculate highest and lowest marks
* Sort course statistics
* Use aggregation pipelines
* Join students and courses using `$lookup`
* Use `$unwind` to process lookup results
* Secure MongoDB connection using environment variables

## 🛠️ Technologies Used

* **Node.js**
* **MongoDB**
* **MongoDB Node.js Driver**
* **MongoDB Atlas**
* **dotenv**
* **JavaScript**
* **Git & GitHub**

## 📂 Project Structure

```text
student-course-manager/
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

> `node_modules/` and `.env` are excluded from GitHub using `.gitignore`.

## 📊 MongoDB Collections

### Students

Example student document:

```json
{
  "name": "Jeeva",
  "age": 22,
  "course": "AI",
  "marks": 90,
  "skills": [
    "Python",
    "MongoDB",
    "Machine Learning"
  ]
}
```

### Courses

Example course document:

```json
{
  "name": "AI",
  "duration": "6 months",
  "fee": 25000
}
```

## 🔥 MongoDB Concepts Practiced

### CRUD

```text
Create → insertOne()
Read   → find()
Update → updateOne()
Delete → deleteOne()
```

### Aggregation

The project demonstrates:

* `$match`
* `$group`
* `$sum`
* `$avg`
* `$min`
* `$max`
* `$sort`
* `$project`
* `$lookup`
* `$unwind`

### Example Aggregation Pipeline

```javascript
const highScorers = await students.aggregate([
    {
        $match: {
            marks: { $gte: 80 }
        }
    },
    {
        $group: {
            _id: "$course",
            totalStudents: { $sum: 1 },
            averageMarks: { $avg: "$marks" },
            highestMarks: { $max: "$marks" },
            lowestMarks: { $min: "$marks" }
        }
    },
    {
        $sort: {
            averageMarks: -1
        }
    }
]).toArray();
```

This filters students scoring **80 or above**, groups them by course, calculates statistics, and sorts the results by average marks.

## 🔗 Collection Relationship

The project uses `$lookup` to connect the `students` and `courses` collections.

```text
students.course
      │
      │ $lookup
      ↓
courses.name
```

This allows course information such as duration and fee to be included with student information.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/jeevamsa06/student-course-manager.git
```

### 2. Open the project

```bash
cd student-course-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the value with your MongoDB connection string.

**Never upload your `.env` file to GitHub.**

### 5. Run the project

```bash
node server.js
```

You should see output showing the MongoDB connection, student data, course statistics, aggregation results, and student-course details.

## 🔐 Environment Variables

The project uses `dotenv` to keep the MongoDB connection string outside the source code.

```env
MONGODB_URI=your_mongodb_connection_string
```

The `.gitignore` file prevents `.env` from being committed:

```gitignore
node_modules/
.env
```

## 🎯 Learning Objectives

This project was created as a practical learning project to understand:

* How Node.js connects to MongoDB
* How MongoDB databases and collections work
* How documents are inserted and retrieved
* How CRUD operations work
* How aggregation pipelines work
* How MongoDB filters and groups data
* How multiple collections can be connected
* How environment variables protect sensitive configuration
* How Git and GitHub are used to manage a project

## 🔮 Future Improvements

Planned improvements include:

* Express.js REST API
* Student search API
* Update and delete student APIs
* Course management APIs
* Authentication
* Input validation
* MongoDB indexes
* Pagination
* Web-based frontend
* Dashboard for student analytics

## 👨‍💻 Author

**Jeeva M**

Student Course Manager — MongoDB Learning Project

---

⭐ Built as a practical project to learn MongoDB and backend development.
