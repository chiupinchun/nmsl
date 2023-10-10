import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  DefaultValues,
  FieldPath,
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// 以下用於自製表單，非shadcn原有組件
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

// interface Props<T = Record<string, unknown>> {
//   schema: {
//     [k in keyof T]: z.ZodTypeAny;
//   }
//   defaultValues: T
//   onSubmit: (values: T) => void
// }
// export default (
//   { schema, defaultValues, onSubmit }: Props
// ) => {
//   const formSchema = z.object(schema)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues
//   })

//   return (
//     <Form {...form}>
//       <form className="space-y-8">
//         <FormField
//           control={form.control}
//           name="account"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>帳號</FormLabel>
//               <FormControl>
//                 <Input placeholder="請輸入8-20字的帳號" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>密碼</FormLabel>
//               <FormControl>
//                 <Input placeholder="請輸入8-20字的密碼" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>暱稱</FormLabel>
//               <FormControl>
//                 <Input placeholder="請輸入1-20字的暱稱" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button onClick={form.handleSubmit(onSubmit)}>註冊</Button>
//       </form>
//     </Form>
//   )
// }

interface ColConfig<DefaultValue = unknown> {
  text: string;
  type: 'string' | 'password';
  range: number[];
  default: DefaultValue;
}
export type FormConfig<FormPayload extends FieldValues = Record<string, unknown>> = {
  [k in keyof FormPayload]: ColConfig<FormPayload[k]>;
};
interface Props<FormPayload extends FieldValues = Record<string, unknown>> {
  data: FormConfig<FormPayload>;
  submit: {
    text?: string;
    onSubmit: SubmitHandler<FormPayload>;
    slot?: React.ReactNode;
  };
  title?: string;
  children?: React.ReactNode;
}
export default function <T extends FieldValues = Record<string, unknown>>(
  { data, submit, title, children }: Props<T>
) {
  const schema: z.ZodRawShape = {};
  for (const key in data) {
    const col: ColConfig = data[key];
    let colSchema: z.ZodString | undefined;
    switch (col.type) {
      case 'string':
      case 'password':
        colSchema = z.string();
        const min = col.range[0];
        const max = col.range[1];
        if (min) {
          colSchema = colSchema.min(min, {
            message: `${col.text}應超過${min}個字。`
          });
        }
        if (max) {
          colSchema = colSchema.max(max, {
            message: `${col.text}不得超過${max}個字。`
          });
        }
        break;
    }
    if (colSchema) schema[key] = colSchema;
  }
  const formSchma = z.object(schema);

  const defaults: Partial<DefaultValues<T>> = {};
  for (const key in data) {
    defaults[key] = data[key].default;
  }
  const form = useForm({
    resolver: zodResolver(formSchma),
    defaultValues: defaults as DefaultValues<T>
  });

  const getPlaceholder = (config: ColConfig) => {
    if (!config.range?.length) return `請輸入${config.text}`;
    switch (config.range.length) {
      case 2:
        return `請輸入${config.range[0]}-${config.range[1]}字的${config.text}`;
      case 1:
        if (config.range[0]) return `請輸入${config.range[0]}字以上的${config.text}`;
        if (config.range[1]) return `請輸入${config.range[0]}字以下的${config.text}`;
        break;
    }

    throw new Error(config.text + '欄位接收到非預期的參數');
  };

  return (
    <Form {...form}>
      <h2 className='mb-3 text-center'>{title}</h2>
      <form className="space-y-8">
        {Object.keys(data).map(key => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{data[key].text}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder(data[key])} {...field} type={data[key].type} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {children}
        <div className="md:flex flex-row-reverse justify-between">
          {submit.slot}
          <Button onClick={form.handleSubmit(submit.onSubmit)} className="w-full md:w-auto">{submit.text ?? '送出'}</Button>
        </div>
      </form>
    </Form>
  );
};