"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent } from "./popover";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    if (type === 'password' && !props.autoComplete) props.autoComplete = 'off';

    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

type AutoCompleteInputProps = Omit<InputProps, 'onChange'> & {
  onChange?: Dispatch<SetStateAction<any>>;
  autoInputOpts?: (InputProps['value'])[];
};
/**
 * 父元素需要position: relative
 */
const AutoCompleteInput = (
  {
    autoInputOpts: _autoInputOpts,
    value: _value, onChange,
    ...props
  }: AutoCompleteInputProps
) => {

  const [value, setValue] = useState(_value ?? '');
  const handleChange = (value: InputProps['value']) => {
    if (value === undefined) return;
    setValue(value);
    onChange && onChange(value);
  };

  const autoInputOpts = Array.isArray(_autoInputOpts) ?
    React.useMemo(() => Array.from(new Set(_autoInputOpts)).filter(item => `${item}`.includes(`${value}`)), [_autoInputOpts]) :
    _autoInputOpts;

  return (
    <>
      <Input {...props} value={value} onChange={e => handleChange(e.target.value)} />
      {autoInputOpts && (
        <ul className='absolute max-h-60 overflow-y-auto border border-slate-500 rounded-md bg-white text-black scroll-bar' style={{ top: 'calc(100% + 1rem)' }}>
          {autoInputOpts.map((item, i) => (
            <li key={i}>
              <a onClick={(e) => { e.preventDefault(); handleChange(item); }} href="#" className="block px-8 py-2 hover:bg-slate-200">{item}</a>
            </li>
          ))}
        </ul >
      )}
    </>
  );
};

export { Input, AutoCompleteInput };
