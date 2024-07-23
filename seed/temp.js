const mongoose = require('mongoose');
const async = require('async');
const Candidate = require('../app/models/candidates'); 
const Registration = require('../app/models/registration'); 
const User = require('../app/models/users'); 

const uri = 'mongodb+srv://devavratthokal30:5M8ZA2a6z9tNlgCJ@introspects.roghyjv.mongodb.net/introDev';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log("Connected to MongoDB!");
  let data = [];
  try {
    const regs = await Registration.find().limit(1).populate({ path: 'user', model: 'User' }).exec();
    await async.eachSeries(regs, async (registration) => {
      if (registration.user) {
        data.push({
          selectedTestType: null,
          fullName: `${registration.firstName} ${registration.middleName} ${registration.lastName}`,
          phoneNumber: registration.mobileNo,
          email: registration.email,
          selectedLabels: [],
          testDateTime: null,
          status: registration.status,
          category: registration.user.category,
          messageCount: registration.messageCount,
          name: registration.name,
          countryCode: registration.countryCode,
          project: registration.user.project,
          belongTo: registration.belongTo,
          education: registration.user.education,
          examId: registration.user.examId,
          gender: registration.user.gender,
          dob: registration.user.dob,
          curriculum: registration.user.curriculum,
          city: registration.user.city, 
          pincode: registration.user.pincode,
          state: registration.user.state, 
          examName: registration.user.examName,
          reg: registration.user.reg,
          address: registration.user.address
        });
      }
      console.log(registration);
    });

    await async.eachSeries(data, async (candidateData) => {
      const candidate = new Candidate(candidateData);
      await candidate.save();
      console.log(`Candidate ${candidate.fullName} saved.`);
    });

    console.log("done");
    console.log(data); 
  } catch (err) {
    console.error(err);
  }
});

