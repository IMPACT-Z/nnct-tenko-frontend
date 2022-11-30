import React from 'react';
import Field from './field/Index';


const Form = ({data}) => {
    return (
        <div
            style={{width: '416px'}}
        >
            {data.title && 
                <h3 className="px-8 text-start text-slate-600 text-3xl tracking-wider">
                    {data.title}
                </h3>
            }
            <form method="POST" className="mt-10 flex flex-col gap-y-10" id="main-form" data-init-d-type="{{ form.now_d_type }}">
                <div className="flex flex-col gap-y-6" id="form-entities">
                    {data.fields.map(field => <Field key={field.name} data={field} />)}
                </div>
                
                {data.links &&
                    <div className="px-6 flex flex-col gap-y-2">
                        {data.links.map(link => <div key={link.uri}>link</div>)}
                    </div>
                }
                
                <div className="flex flex-col gap-y-4">
                    {data.submits.map(submit =>
                        <button 
                            key={submit.next_uri}
                            type="submit" formAction={submit.next_uri}
                            className="ring-1 ring-slate-200 rounded-full px-6 py-1 bg-sky-400 text-white text-base font-bold hover:opacity-75"
                        >
                            {submit.label}
                        </button>
                    )}
                </div>
            </form>

            {data.delete_link && 
                <form
                    method="POST" 
                    className="mt-4 flex flex-col"
                    id="link-form"
                >
                    <button 
                        type="submit" formAction={data.delete_link.uri}
                        className="ring-1 ring-slate-200 rounded-full px-6 py-1 bg-sky-400 text-white text-base font-bold hover:opacity-75"
                    >
                        {data.delete_link.label}
                    </button>
                    </form>
            }
        </div>
    );
}

export default Form;
