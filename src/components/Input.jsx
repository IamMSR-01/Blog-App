import React, { useId } from 'react'
import { motion } from 'framer-motion'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <motion.div 
            className='w-full' 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {label && (
                <label 
                    className='inline-block mb-1 pl-1 text-white' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white outline-none focus:bg-white/20 duration-300 border border-white/30 w-full transition-all ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </motion.div>
    )
})

export default Input
