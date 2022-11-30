import {Link} from 'react-router-dom';


const LinkContainer = ({data}) => {
    switch(data.type) {
        case 'link':
            return (
                <div className="underline text-slate-600 hover:text-teal-400">
                    <Link to={data.to}>{data.label}</Link>
                </div>
            );
        
        case 'button':
            return (
                <form 
                    onSubmit={data.onClick}
                    className="row-form flex items-center"
                >
                    <button 
                        type="submit"
                        className="w-auto ring-1 ring-slate-200 rounded-full px-2 bg-slate-500 text-base text-white hover:opacity-75"
                    >
                        {data.label}
                    </button>
                </form>
            );
        default:
            return (
                <></>
            );
    }
}

export default LinkContainer;
