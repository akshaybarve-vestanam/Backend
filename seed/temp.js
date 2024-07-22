// const { MongoClient } = require('mongodb');

// // Replace the following with your MongoDB connection string
// const uri = 'mongodb+srv://devavratthokal30:5M8ZA2a6z9tNlgCJ@introspects.roghyjv.mongodb.net/introDev';

// async function fetchRegistrations() {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();
//         console.log("Connected to database!");

//         const database = client.db('introDev');
//         const registrations = database.collection('registrations');

//         // Fetching 10 documents from the registrations collection
//         const registrationsData = await registrations.find().limit(10).toArray();

//         console.log("Registrations Data:");
//         console.log(registrationsData);

//     } catch (error) {
//         console.error('Error fetching registrations:', error);
//     } finally {
//         await client.close();
//     }
// }

// fetchRegistrations();









// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // MongoDB connection string
// const uri = 'mongodb+srv://devavratthokal30:5M8ZA2a6z9tNlgCJ@introspects.roghyjv.mongodb.net/introDev';

// // Connect to the database
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to database!"))
//     .catch(err => console.error("Error connecting to database:", err));

// // Define the Registration schema with a user field
// const registrationSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'User' }
// }, { collection: 'registrations', strict: false });

// // Define the User schema with necessary fields
// const userSchema = new Schema({
//     // Define fields that you need from users collection
//     name: String,
//     email: String
// }, { collection: 'users', strict: false });

// const Registration = mongoose.model('Registration', registrationSchema);
// const User = mongoose.model('User', userSchema);

// async function fetchAndPopulateRegistrations() {
//     try {
//         // Fetching 10 documents from the registrations collection and populating the user field
//         const registrationsData = await Registration.find().limit(10).populate('user').exec();

//         console.log("Registrations Data with Populated Users:");
//         console.log(JSON.stringify(registrationsData, null, 2));

//     } catch (error) {
//         console.error('Error fetching or populating registrations:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

// fetchAndPopulateRegistrations();









const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const Candidate = require('../app/models/candidates'); // Make sure the path is correct

// MongoDB connection string
const uri = 'mongodb+srv://devavratthokal30:5M8ZA2a6z9tNlgCJ@introspects.roghyjv.mongodb.net/introDev';

// Connecting to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log("Connected to MongoDB!");

  try {
    const registrations = await db.collection('registrations').find().limit(10).toArray();
    const userIds = registrations.map(reg => reg.user);

    const users = await db.collection('users').find({ _id: { $in: userIds } }).toArray();
    const usersMap = users.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    const candidatesData = registrations.map(reg => {
      const user = usersMap[reg.user];
      return {
        selectedTestType: "exampleTestType", // Example data, update accordingly
        fullName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        phoneNumber: user ? user.phone : "Unknown",
        email: user ? user.email : "Unknown",
        // Add more fields from user or registration as needed
        belongTo: reg._id,
        user: reg.user,
      };
    });

    // Insert candidates data into the candidates collection
    await Candidate.insertMany(candidatesData);

    console.log("Candidates collection populated!");

    // Verify the insertion
    const candidates = await Candidate.find().limit(10).exec();
    console.log("Inserted Candidates:");
    console.log(candidates);

  } catch (error) {
    console.error('Error populating candidates:', error);
  } finally {
    mongoose.connection.close();
  }
});
