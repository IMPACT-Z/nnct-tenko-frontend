import FormPage from '../base/Form';


const CreateUser = () => {
    const context = {
        title: 'ユーザー登録',
        fields: [
            {
                name: 'email',
                label: 'メールアドレス',
                helpText: '254文字以内で入力して下さい。',
                type: 'text',
                required: true,
                rules: {
                    required: '必須です',
                },
            },
        ],
        links: [
            {type: 'link',uri: '/user/login',label: 'ログインする'},
        ],
        submits: [
            {nextUri: '/', label: '登録'},
        ]
    }

    const onSuccess = (data) => {};

    return (
        <FormPage context={context} defaultValues={{}} onSuccess={onSuccess} />
    );
}

export default CreateUser;
