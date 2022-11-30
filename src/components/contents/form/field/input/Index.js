import React from 'react';


const Input = ({data, width}) => {
    const className = 'input-field ring-1 ring-slate-300 px-4 py-2 outline-none rounded-full font-sans text-slate-600 text-sm caret-slate-600';
    const style= {width: `${width}px`};

    switch (data.type) {
        case 'text':
            return <input type="text" className={className} style={style} />;
        case 'number':
            return <input type="number" className={className} style={style} />;
        default:
            return <input type="text" className={className} style={style} />;
    }
}

export default Input;
