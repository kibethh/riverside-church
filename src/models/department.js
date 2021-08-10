const mongoose = require('mongoose');
const validator = require('validator');
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   //showing relationship with user model
    //   ref: 'User',
    // },
  },
  { timestamps: true }
);
const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
