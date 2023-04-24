export default interface EmailInputProps {
  onChange: (value: string) => void;
  error: boolean;
  message: string;
  value: string;
}
