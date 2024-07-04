export interface UserEntity {
    userName: string;
    email: string;
    role:string;
    password:string;
    confirmpassword:string;

  }
export interface PaymentEntity {
    amount: number;
    currency: string;
   
  }