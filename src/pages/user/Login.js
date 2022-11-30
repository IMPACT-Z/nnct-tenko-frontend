import FormPage from '../base/Form';


const Login = () => {
    const context = {
        title: 'ログイン',
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
            {type: 'link',uri: '/user/create',label: 'ユーザー登録をする'},
        ],
        submits: [
            {next_uri: '', label: 'ログイン'},
        ]
    }

    const onSuccess = (data) => alert(data.email);

    return (
        <FormPage context={context} defaultValues={{}} onSuccess={onSuccess} />
    );
}

export default Login;
