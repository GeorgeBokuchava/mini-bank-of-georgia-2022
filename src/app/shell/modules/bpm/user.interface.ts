export interface Client {
  clientKey: number,
  firstName: string,
  image: string,
  lastName: string,
  plusPoints: number,
  sumAmount: number;
}

export interface User{
  image: string,
  name: string,
  username: string,
}

export interface Account {
  accountKey: number,
  accountName: string,
  clientFirstName: string,
  clientLastName: string,
  amount: number,

}
