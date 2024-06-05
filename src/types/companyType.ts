export interface CompanyInterface {
  _id: string;
  title: string;
  address: string;
  email: string;
  image: string;
  registrationDate: string;
}

export interface ReviewInterface {
  _id: string;
  userId: string;
  companyId: string;
  review: string;
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    authKey: number;
  };
}
