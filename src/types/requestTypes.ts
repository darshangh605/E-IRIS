import { IAcademicDetails } from "../models/students.model";
import { IContactDetails } from "../models/users.model";

interface IRegisterUserRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  password: string;
  isActive: boolean;

  role: string;
  roleCode: string;
  contactNo: number;
  email: string;
  lastLoggedIn?: Date;
  title: string;
  titleCode: number;
  gender: string;
  genderCode: number;
  dob: Date;
  maritalStatus: string;
  maritalStatusCode: number;
  qualification: string;
  qualificationCode: number;
  department: string;
  departmentCode: number;
  nationality: string;
  religion: string;
  religionCode: number;
  socialCategory: string;
  socialCategoryCode: number;
  obcSubCategory?: string;
  obcSubCategoryCode?: number;
  residentialAddress?: IContactDetails;
  permanentAddress?: IContactDetails;
}

interface IAddStudents {
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
}
export { IRegisterUserRequest, IAddStudents };
