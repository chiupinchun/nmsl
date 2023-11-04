import { useToast } from "@/components/ui/use-toast";

export default () => {
  const { toast } = useToast();

  return (text: string) => {
    navigator.clipboard.writeText(text);

    toast({ description: '複製成功' });
  };
};