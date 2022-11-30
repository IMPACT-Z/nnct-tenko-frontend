import { useState } from 'react'
import { useForm } from 'react-hook-form'
import LinkContainer from '../Link';

import Field from './field/Index';


const Form = ({context, defaultValues, onSuccess}) => {
    const {register, formState: {errors}, handleSubmit} = useForm({
        defaultValues: defaultValues,
    });

    const [nextUri, setNextUri] = useState(null);

    const onSubmit = (data) => {
        onSuccess(data);
        window.location.href = nextUri;
    };

    return (
        <div>
            {context.title && 
                <h3 className="px-8 text-start text-slate-600 text-3xl tracking-wider">
                    {context.title}
                </h3>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-6">
                    {context.fields.map(field => 
                        <Field key={field.name} context={field} register={register} error={errors[field.name]} />
                    )}
                </div>
                
                {context.links &&
                    <div className="px-6 flex flex-col gap-y-2">
                        {context.links.map(link =>
                            <LinkContainer key={link.uri} data={link} />
                        )}
                    </div>
                }
                
                <div className="flex flex-col gap-y-4">
                    {context.submits.map(submit =>
                        <div key={submit.nextUri}>
                            <button 
                                type="submit"
                                onClick={() => setNextUri(submit.nextUri)}
                                className="ring-1 ring-slate-200 rounded-full px-6 py-1 bg-sky-400 text-white text-base font-bold hover:opacity-75"
                                style={{width: '416px'}}
                            >
                                {submit.label}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Form;
