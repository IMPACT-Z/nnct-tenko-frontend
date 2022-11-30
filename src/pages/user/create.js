import React from 'react';
import FormPage from '../base/Form';

const CreateUser = () => {
    const data = {
        title: 'ユーザー登録',
        fields: [
            {
                name: 'email',
                label: 'メールアドレス',
                input: {type: 'text'},
                required: true,
            },
        ],
        links: [],
        submits: [
            {next_uri: '', label: '登録'},
        ]
    }

    return (
        <FormPage data={data} />
    );
}

export default CreateUser;
