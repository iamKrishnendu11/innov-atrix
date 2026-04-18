import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { User } from "./models/user.model.js";
import { Msme } from "./models/msme.model.js";

dotenv.config();

const dbURI = process.env.MONGODB_URI;

const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        users.push({
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number(),
            password: "password123!", // They will be hashed by pre-save hook
            description: faker.person.bio(),
            skills: faker.helpers.arrayElements(["React", "Node.js", "Python", "MERN Stack", "Figma", "UI/UX", "Data Science", "Flutter", "Java", "C++", "Marketing"], { min: 2, max: 4 }).join(", "),
            githubUrl: `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
            linkedinUrl: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
            pastExperiences: faker.lorem.paragraph(),
            portfolioLink: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`
        });
    }
    return users;
};

const generateMsmes = (count) => {
    const msmes = [];
    for (let i = 0; i < count; i++) {
        msmes.push({
            businessName: faker.company.name(),
            email: faker.internet.email({ provider: 'company.com' }),
            businessType: faker.helpers.arrayElement(["Technology", "Healthcare", "E-commerce", "Finance", "Education", "Marketing"]),
            password: "password123!", // They will be hashed by pre-save hook
        });
    }
    return msmes;
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB...");
        
        const studentsData = generateUsers(30);
        const msmesData = generateMsmes(30);

        // We use create to trigger the pre-save hooks which handle password hashing and profile score calculation
        for (const data of studentsData) {
            await User.create(data);
        }
        console.log("30 Students seeded successfully!");

        for (const data of msmesData) {
            await Msme.create(data);
        }
        console.log("30 MSMEs seeded successfully!");

        console.log("Seeding complete!");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
