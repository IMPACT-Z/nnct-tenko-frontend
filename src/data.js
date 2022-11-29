import { HomeIcon, ArrowLeftOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/solid'

const data = {
    header: {
        title: 'NNCT 点呼',
        shortcutMenu: [
            {
                to: '/',
                type: 'link',
                Icon: HomeIcon,
            },
            {
                to: 'logout',
                type: 'button',
                Icon: ArrowLeftOnRectangleIcon,
            }
        ],
        mainMenus: [
            {
                title: '点呼',
                Icon: MegaphoneIcon,
                menu: [
                    {
                        to: '/',
                        label: '点呼をする',
                    }
                ]
            }
        ]
    },
    footer: {
        copyright: {
            year: 2022,
            organization: '衝撃のイナズマZ'
        }
    }
};

export default data;
