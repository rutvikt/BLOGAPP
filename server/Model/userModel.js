const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  phoneNo: {
    type: String,
    required: [true, "Please provide a phone number"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10,15}$/.test(v); // Basic phone number validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  education: {
    type: String,
    required: [true, "Please provide your education level"],
   
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false
  },
  photo: {
    public_id:{
      type:String,
      require:true
    },
     url:{
      type:String,
      require:true
    }
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will add createdAt and updatedAt automatically
  // Note: If you explicitly define createdAt above, it will override the timestamp version
});

const User = mongoose.model("User", userSchema);
module.exports = User;


