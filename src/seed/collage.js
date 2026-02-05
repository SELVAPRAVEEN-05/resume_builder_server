const mongoose = require("mongoose");
const collage = require("../models/college");

const colleges = [
    {
        collegeName: "Anna University",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "Anna University",
        degree: "B.E",
        specialization: "Information Technology"
    },
    {
        collegeName: "Anna University",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "Anna University",
        degree: "B.E",
        specialization: "Electrical and Electronics Engineering"
    },
    {
        collegeName: "Anna University",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },


    {
        collegeName: "SRM Institute of Science and Technology",
        degree: "B.Tech",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "SRM Institute of Science and Technology",
        degree: "B.Tech",
        specialization: "Artificial Intelligence"
    },
    {
        collegeName: "SRM Institute of Science and Technology",
        degree: "B.Tech",
        specialization: "Data Science"
    },
    {
        collegeName: "SRM Institute of Science and Technology",
        degree: "B.Tech",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "SRM Institute of Science and Technology",
        degree: "B.Tech",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "VIT University",
        degree: "B.Tech",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "VIT University",
        degree: "B.Tech",
        specialization: "Information Technology"
    },
    {
        collegeName: "VIT University",
        degree: "B.Tech",
        specialization: "Artificial Intelligence and ML"
    },
    {
        collegeName: "VIT University",
        degree: "B.Tech",
        specialization: "Cyber Security"
    },
    {
        collegeName: "VIT University",
        degree: "B.Tech",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "IIT Madras",
        degree: "B.Tech",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "IIT Madras",
        degree: "B.Tech",
        specialization: "Electrical Engineering"
    },
    {
        collegeName: "IIT Madras",
        degree: "B.Tech",
        specialization: "Mechanical Engineering"
    },
    {
        collegeName: "IIT Madras",
        degree: "B.Tech",
        specialization: "Civil Engineering"
    },
    {
        collegeName: "IIT Madras",
        degree: "B.Tech",
        specialization: "Aerospace Engineering"
    },

    {
        collegeName: "NIT Trichy",
        degree: "B.Tech",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "NIT Trichy",
        degree: "B.Tech",
        specialization: "Information Technology"
    },
    {
        collegeName: "NIT Trichy",
        degree: "B.Tech",
        specialization: "Electrical Engineering"
    },
    {
        collegeName: "NIT Trichy",
        degree: "B.Tech",
        specialization: "Mechanical Engineering"
    },
    {
        collegeName: "NIT Trichy",
        degree: "B.Tech",
        specialization: "Civil Engineering"
    },

    {
        collegeName: "PSG College of Technology",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "PSG College of Technology",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "PSG College of Technology",
        degree: "B.E",
        specialization: "Electrical Engineering"
    },
    {
        collegeName: "PSG College of Technology",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },
    {
        collegeName: "PSG College of Technology",
        degree: "B.E",
        specialization: "Civil Engineering"
    },

    {
        collegeName: "MIT Chennai",
        degree: "B.E",
        specialization: "Aeronautical Engineering"
    },
    {
        collegeName: "MIT Chennai",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "MIT Chennai",
        degree: "B.E",
        specialization: "Electronics Engineering"
    },
    {
        collegeName: "MIT Chennai",
        degree: "B.E",
        specialization: "Instrumentation Engineering"
    },
    {
        collegeName: "MIT Chennai",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "SSN College of Engineering",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "SSN College of Engineering",
        degree: "B.E",
        specialization: "Information Technology"
    },
    {
        collegeName: "SSN College of Engineering",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "SSN College of Engineering",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },
    {
        collegeName: "SSN College of Engineering",
        degree: "B.E",
        specialization: "Civil Engineering"
    },

    {
        collegeName: "Bannari Amman Institute of Technology",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "Bannari Amman Institute of Technology",
        degree: "B.E",
        specialization: "Information Technology"
    },
    {
        collegeName: "Bannari Amman Institute of Technology",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "Bannari Amman Institute of Technology",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },
    {
        collegeName: "Bannari Amman Institute of Technology",
        degree: "B.E",
        specialization: "Civil Engineering"
    },

    {
        collegeName: "Kongu Engineering College",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "Kongu Engineering College",
        degree: "B.E",
        specialization: "Information Technology"
    },
    {
        collegeName: "Kongu Engineering College",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "Kongu Engineering College",
        degree: "B.E",
        specialization: "Electrical and Electronics Engineering"
    },
    {
        collegeName: "Kongu Engineering College",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "B.E",
        specialization: "Artificial Intelligence and Data Science"
    },
    {
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "B.E",
        specialization: "Electrical and Electronics Engineering"
    },
    {
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "Kumaraguru College of Technology",
        degree: "B.E",
        specialization: "Computer Science and Engineering"
    },
    {
        collegeName: "Kumaraguru College of Technology",
        degree: "B.E",
        specialization: "Information Technology"
    },
    {
        collegeName: "Kumaraguru College of Technology",
        degree: "B.E",
        specialization: "Electronics and Communication Engineering"
    },
    {
        collegeName: "Kumaraguru College of Technology",
        degree: "B.E",
        specialization: "Electrical and Electronics Engineering"
    },
    {
        collegeName: "Kumaraguru College of Technology",
        degree: "B.E",
        specialization: "Mechanical Engineering"
    },

    {
        collegeName: "Loyola College",
        degree: "B.A",
        specialization: "English Literature"
    },
    {
        collegeName: "Loyola College",
        degree: "B.Sc",
        specialization: "Computer Science"
    },
    {
        collegeName: "Presidency College",
        degree: "B.A",
        specialization: "History"
    },
    {
        collegeName: "Presidency College",
        degree: "B.Sc",
        specialization: "Mathematics"
    },
    {
        collegeName: "Madras Christian College",
        degree: "B.A",
        specialization: "Economics"
    },
    {
        collegeName: "Madras Christian College",
        degree: "B.Sc",
        specialization: "Physics"
    },
    {
        collegeName: "Ethiraj College",
        degree: "B.Com",
        specialization: "Commerce"
    },
    {
        collegeName: "Ethiraj College",
        degree: "B.Sc",
        specialization: "Visual Communication"
    },
    {
        collegeName: "Stella Maris College",
        degree: "B.A",
        specialization: "Psychology"
    },
    {
        collegeName: "Stella Maris College",
        degree: "B.Sc",
        specialization: "Computer Science"
    }

];

const seedColleges = async () => {
    try {
        await collage.deleteMany({});
        const result = await collage.insertMany(colleges);
        console.log(`${result.length} colleges inserted into database`);
    } catch (error) {
        console.error('Error seeding colleges:', error.message);
    }
};

module.exports = seedColleges;