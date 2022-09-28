import { string } from "yup";

export interface IVendor {
  email: string;
  contactPersonName: string;
  username: string;
  password: string;
  contactNumber?: number;
  companyName: string;
  registrationNumber: string;
  incorporationDate: Date | string;
  registeredOfficeAddress: string;
  uploadedFiles: string[];
  trackedProjects?: string[];
  brandSummary?: string;
  portfolio: string[];
  // messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  // review: [{type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}

export interface IProject {
  _id?: string;
  vendorId?: string;
  clientId?: string;
  projectName: string;
  housingType: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectStatus: string;
  uploadedFiles: string[];
  description?: string;
  projectProgress?: string;
  // review:{type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  designTheme: string;
  clientName?: string;
  vendorName?: string;
  totalCosting?: number;
  comments?: string;
}

export interface IPortfolio {
  _id?: string;
  vendorId?: string;
  portfolioName: string;
  housingType: string;
  images: string[];
  description?: string;
  designTheme: string;
}

export interface IPortfolio2 {
  _id?: string;
  vendorId?: { _id: string, username: string };
  portfolioName: string;
  housingType: string;
  images: string[];
  description?: string;
  designTheme: string;
}

export interface IVendorProfile {
  _id?: string;
  brandSummary: string;
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  email: string;


}
export interface IVendorPortfolio {
  _id?: string;
  vendorId: IVendorProfile;
  portfolioName: string;
  housingType: string;
  images: string[];
  description?: string;
  designTheme: string;
  __v?: number
}

export interface IClient {
  username: string;
  password: string;
  email: string;
  fullName: string;
  // trackedProjects?: string[];
  // favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
}

export interface IActivities {
  projectId: string;
  _id: string;
  activityTitle: string;
  activityDescription: string;
  activityStartDate: Date;
  activityEndDate: Date;
  personInCharge: string;
  status: string;
  photos: string[];
  __v?: number;
}

export interface ITokenContext {
  token: String;
  setTokenState: (data: String) => void;
}

export interface IProjectTwo {
  vendorId: string;
  clientId: string;
  projectName: string;
  housingType: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectStatus: string;
  uploadedFiles: string[];
  description: string;
  designTheme: string;
  totalCosting: number;
  comments: string;
}
