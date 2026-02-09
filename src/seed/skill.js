const mongoose = require("mongoose");

const Skill = require('../models/skill');

const skills = [
    { skillName: "C" },
    { skillName: "C++" },
    { skillName: "Java" },
    { skillName: "Python" },
    { skillName: "JavaScript" },
    { skillName: "TypeScript" },
    { skillName: "HTML" },
    { skillName: "CSS" },
    { skillName: "React.js" },
    { skillName: "Next.js" },
    { skillName: "Node.js" },
    { skillName: "Express.js" },
    { skillName: "MongoDB" },
    { skillName: "MySQL" },
    { skillName: "Firebase" },
    { skillName: "Git" },
    { skillName: "GitHub" },
    { skillName: "Docker" },
    { skillName: "React Native" },
    { skillName: "Android" }
];

const seedSkills = async () => {
    try {
        await Skill.deleteMany({});
        const result = await Skill.insertMany(skills);
        console.log(`${result.length} skills inserted into database`);
    } catch (error) {
        console.error('Error seeding skills:', error.message);
    }
};

module.exports = seedSkills;

