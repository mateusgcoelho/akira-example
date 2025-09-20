export type ResponseServiceActionDTO<T> = {
  success: boolean;
  message?: string;
  data?: T;
};
