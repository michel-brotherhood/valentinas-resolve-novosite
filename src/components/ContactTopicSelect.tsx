import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactTopicSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const topics = [
  "Dúvidas",
  "Sugestões",
  "Quero trabalhar",
  "Financeiro",
  "Parcerias",
];

export const ContactTopicSelect = ({ value, onChange, placeholder = "Selecione um assunto" }: ContactTopicSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {topics.map((topic) => (
          <SelectItem key={topic} value={topic}>
            {topic}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
