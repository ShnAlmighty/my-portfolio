import React from 'react';

// Input component
interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-background-light border ${error ? 'border-red-500' : 'border-background-light'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Textarea component
interface TextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-background-light border ${error ? 'border-red-500' : 'border-background-light'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Select component
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-background-light border ${error ? 'border-red-500' : 'border-background-light'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary`}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Checkbox component
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  error,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-background-light rounded"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-text-secondary">
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Form component
interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = '',
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default {
  Form,
  Input,
  Textarea,
  Select,
  Checkbox,
};