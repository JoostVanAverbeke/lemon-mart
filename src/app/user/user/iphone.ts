import {PhoneType} from './phone.enum';

export interface IPhone {
  type: PhoneType;
  digits: string;
  id: number;
}
