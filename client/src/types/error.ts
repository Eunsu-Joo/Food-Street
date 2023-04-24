export interface CustomErrorType {
  status: number;
  message: string;
  details: {
    [key: string]: boolean;
  };
}
