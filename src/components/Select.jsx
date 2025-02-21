import React, { useId } from 'react';

const Select = React.forwardRef(({ options, label, className = '', ...props }, ref) => {
    const id = useId();
    
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='block mb-2 text-white text-lg font-semibold'>{label}</label>}
            <div className='relative'>
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 border border-white/20 w-full backdrop-blur-md shadow-md ${className}`}
                >
                    {options?.map((option) => (
                        <option key={option} value={option} className='text-black'>
                            {option}
                        </option>
                    ))}
                </select>
                <span className='absolute top-1/2 right-4 transform -translate-y-1/2 text-white pointer-events-none'>▼</span>
            </div>
        </div>
    );
});

export default Select;
