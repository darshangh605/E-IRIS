import mongoose, { Schema } from "mongoose";

interface IStudents {
  _id?: string;
  studentId?: number;
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
  residentialAddress: IContactDetails;
  permanentAddress: IContactDetails;
  academicDetails: IAcademicDetails;
  bankDetails?: IBankDetails;
  //   state: string;
  //   stateRef: number;
  //   district: string;
  //   districtRef: number;
  //   city: string;
  //   zipCode: number;
}
interface IContactDetails {
  address: string;
  state: string;
  stateRef: number;
  district: string;
  districtRef: number;
  city: string;
  zipCode: number;
}
interface IAcademicDetails {
  sslcRegNo: string;
  pucRegNo?: string;
  diplomaRegNo?: string;
  sslcResult: string;
  pucResult?: string;
  diplomaResult?: string;
  quotaType?: string;
  quotaTypeCode?: number;
  entranceType?: string;
  entranceTypeCode?: number;
}
interface IBankDetails {
  bankAccountNo: string;
  bankName: string;
  bankIFSCCode: string;
}
const bankDetailSchema: Schema = new Schema<IBankDetails>({
  bankAccountNo: { type: String },
  bankName: { type: String },
  bankIFSCCode: { type: String },
});
const academicDetailsSchema: Schema = new Schema<IAcademicDetails>({
  sslcRegNo: { type: String, required: true },
  pucRegNo: { type: String },
  diplomaRegNo: { type: String },
  sslcResult: { type: String },
  pucResult: { type: String },
  diplomaResult: { type: String },
  quotaType: { type: String },
  quotaTypeCode: { type: Number },
  entranceType: { type: String },
  entranceTypeCode: { type: Number },
});

const contactSchema: Schema = new Schema<IContactDetails>({
  address: { type: String, required: true },
  state: { type: String, required: true },
  stateRef: { type: Number, required: true },
  district: { type: String, required: true },
  districtRef: { type: Number, required: true },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
});
const studentSchema: Schema = new Schema<IStudents>(
  {
    studentId: { type: Number },
    firstName: { type: String, required: true, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    isActive: { type: Boolean, required: true },
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
    residentialAddress: { type: contactSchema, required: true },
    permanentAddress: { type: contactSchema, required: true },
    academicDetails: { type: academicDetailsSchema },
    bankDetails: { type: bankDetailSchema },
    // state: { type: String, required: true },
    // stateRef: { type: Number, required: true },
    // district: { type: String, required: true },
    // districtRef: { type: Number, required: true },
    // city: { type: String, required: true },
    // zipCode: { type: Number, required: true },
  },
  {
    collection: "students",
    versionKey: false,
  }
);
const Students = mongoose.model<IStudents>("Students", studentSchema);
export { Students, IStudents, IAcademicDetails };
