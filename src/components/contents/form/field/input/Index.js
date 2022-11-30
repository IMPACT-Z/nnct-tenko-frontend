import React from 'react';


const Input = ({context, width, register}) => {
    const commonAttrs = {...register(context.name, context.rules)}
    commonAttrs.className = 'input-field ring-1 ring-slate-300 px-4 py-2 outline-none rounded-full font-sans text-slate-600 text-sm caret-slate-600';
    commonAttrs.style = {width: `${width}px`};

    switch (context.type) {
        case 'text':
            return (
                <input type="text" {...commonAttrs} />
            );
        
        default:
            return (
                <></>
            );
    }
}

export default Input;
