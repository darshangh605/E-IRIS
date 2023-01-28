import mongoose, { Schema } from "mongoose";

interface IStudents {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  fatherName: string;
  motherName: string;
  gender: string;
  genderCode: number;
  dob: Date;
  isActive: boolean;
  department: string;
  departmentCode: number;
  nationality: string;
  religion: string;
  religionCode: number;
  socialCategory: string;
  socialCategoryCode: number;
  obcSubCategory?: string;
  obcSubCategoryCode?: number;
  residentialAddress: string;
  permanentAddress: string;
  state: string;
  stateRef: number;
  district: string;
  districtRef: number;
  city: string;
  zipCode: number;
}
const studentSchema: Schema = new Schema<IStudents>(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    isActive: { type: Boolean, required: true },

    //contactNo: { type: Number, required: true, maxlength: 10 },
    //email: { type: String, unique: true },

    gender: { type: String, required: true },
    genderCode: { type: Number, required: true },
    dob: { type: Date },
    department: { type: String, required: true },
    departmentCode: { type: Number, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    religionCode: { type: Number, required: true },
    socialCategory: { type: String, required: true },
    socialCategoryCode: { type: Number, required: true },
    obcSubCategory: { type: String },
    obcSubCategoryCode: { type: Number },
    residentialAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    state: { type: String, required: true },
    stateRef: { type: Number, required: true },
    district: { type: String, required: true },
    districtRef: { type: Number, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
  {
    collection: "students",
    versionKey: false,
  }
);
const Students = mongoose.model<IStudents>("Students", studentSchema);
export { Students, IStudents };
