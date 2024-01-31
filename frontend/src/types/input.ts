export type InputProps = {
    placeholder?: string;
    name: string;
    id: string;
    value: string;
    height?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };