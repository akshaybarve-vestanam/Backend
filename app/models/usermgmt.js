const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      maxlength: 100,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      }
    ]
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  console.log("user pre save hook called");
  const chars = "0123456789";
  let userId = "";
  let isUnique = false;

  while (!isUnique) {
    userId = "U";
    for (let i = 0; i < 6; i++) {
      userId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      isUnique = true;
    } else {
      console.log(`Duplicate user ID found: ${userId}. Generating a new ID.`);
    }
  }
  this.userId = userId;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
