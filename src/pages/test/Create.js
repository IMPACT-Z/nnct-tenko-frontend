import FormPage from '../base/Form';


const TestCreate = () => {
    const context = {
        title: '登録フォーム(テスト)',
        fields: [
            {
                name: 'field1',
                label: 'フィールド1',
                type: 'text',
                required: true,
                rules: {
                    required: '必須です',
                },
            },
            {
                name: 'field2',
                label: 'フィールド2',
                type: 'text',
                required: true,
                helpText: '5文字以上10文字以下で入力して下さい。',
                rules: {
                    required: '必須です',
                    minLength: {
                        value: 5,
                        message: '5文字以上で入力して下さい。'
                    },
                    maxLength: {
                        value: 10,
                        message: '10文字以上で入力して下さい。'
                    },
                },
            },
        ],
        links: [
            {type: 'link',uri: '/',label: 'トップページ'},
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

export default TestCreate;
