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
  // messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  // portfolio: [{type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  // review: [{type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}

export interface IProject {
  vendorID?: string;
  clientID?: string;
  projectName: string;
  housingType: string[];
  projectStartDate: Date;
  projectEndDate: Date;
  projectStatus: string[];
  uploadedFiles: string;
  description?: string;
  projectProgress?: string;
  // review:{type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  designTheme: string[];
}

export interface IClient {
  username: string;
  password: string;
  email: string;
  fullName: string;
  trackedProjects?: string[];
  // favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
}

export interface IActivities {
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
  token: String[];
  setTokenState: (data: String) => void;
}
