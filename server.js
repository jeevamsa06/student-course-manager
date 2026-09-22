require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectDB() {
    try {
        // 1. Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        // 2. Select database
        const db = client.db("student-course-manager");

        // 3. Select collections
        const students = db.collection("students");
        const courses = db.collection("courses");

        // --------------------------------------------------
        // 4. Clean old learning data
        // --------------------------------------------------

        await students.deleteMany({});
        await courses.deleteMany({});

        // --------------------------------------------------
        // 5. Add student function
        // --------------------------------------------------

        async function addStudent(name, age, course, marks, skills) {
            const result = await students.insertOne({
                name,
                age,
                course,
                marks,
                skills
            });

            console.log("Student added:", result.insertedId);
        }

        // --------------------------------------------------
        // 6. Get all students function
        // --------------------------------------------------

        async function getStudents() {
            const allStudents = await students.find({}).toArray();

            console.log("\nAll Students:");
            console.log(allStudents);
        }

        // --------------------------------------------------
        // 7. Add students
        // --------------------------------------------------

        await addStudent(
            "Jeeva",
            22,
            "AI",
            90,
            ["Python", "MongoDB", "Machine Learning"]
        );

        await addStudent(
            "Rahul",
            21,
            "AI",
            85,
            ["Python", "Machine Learning"]
        );

        await addStudent(
            "Priya",
            22,
            "MongoDB",
            92,
            ["MongoDB", "Node.js"]
        );

        await addStudent(
            "Arun",
            23,
            "MongoDB",
            78,
            ["JavaScript", "MongoDB"]
        );

        await addStudent(
            "Divya",
            21,
            "Python",
            88,
            ["Python", "Pandas"]
        );

        // --------------------------------------------------
        // 8. View all students
        // --------------------------------------------------

        await getStudents();

        // --------------------------------------------------
        // 9. Insert courses
        // --------------------------------------------------

        await courses.insertMany([
            {
                name: "AI",
                duration: "6 months",
                fee: 25000
            },
            {
                name: "MongoDB",
                duration: "3 months",
                fee: 15000
            },
            {
                name: "Python",
                duration: "4 months",
                fee: 18000
            }
        ]);

        console.log("\nCourses inserted!");

        // ==================================================
        // AGGREGATION 1
        // Count students in each course
        // ==================================================

        const courseCount = await students.aggregate([
            {
                $group: {
                    _id: "$course",
                    totalStudents: { $sum: 1 }
                }
            }
        ]).toArray();

        console.log("\n1. Course Count:");
        console.log(courseCount);

        // ==================================================
        // AGGREGATION 2
        // Average marks for each course
        // ==================================================

        const averageMarks = await students.aggregate([
            {
                $group: {
                    _id: "$course",
                    totalStudents: { $sum: 1 },
                    averageMarks: { $avg: "$marks" }
                }
            }
        ]).toArray();

        console.log("\n2. Average Marks:");
        console.log(averageMarks);

        // ==================================================
        // AGGREGATION 3
        // Students with marks >= 80
        // ==================================================

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
            },
            {
                $project: {
                    _id: 0,
                    course: "$_id",
                    totalStudents: 1,
                    averageMarks: 1,
                    highestMarks: 1,
                    lowestMarks: 1
                }
            }
        ]).toArray();

        console.log("\n3. High Scorer Statistics:");
        console.log(highScorers);

        // ==================================================
        // AGGREGATION 4
        // $lookup
        // Join students with courses
        // ==================================================

        const studentDetails = await students.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "name",
                    as: "courseDetails"
                }
            },
            {
                $unwind: "$courseDetails"
            }
        ]).toArray();

        console.log("\n4. Student + Course Details:");
        console.log(studentDetails);

    } catch (error) {
        console.error("MongoDB error:", error);
    } finally {
        await client.close();
        console.log("\nMongoDB connection closed.");
    }
}

connectDB();