import { useToast } from "@/components/ui/use-toast";

export default () => {
  const { toast } = useToast();

  return (text: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    else {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var message = successful ? '复制成功' : '复制失败';
        console.log(message);
      } catch (err) {
        console.warn(err);
      }

      document.body.removeChild(textArea);
    }

    toast({ description: '複製成功' });
  };
};