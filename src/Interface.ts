export interface IVendor {
  email: string;
  contactPersonName: string;
  username: string;
  password: string;
  contactNumber?: number;
  companyName: string;
  registrationNumber: string;
  incorporationDate: Date;
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
