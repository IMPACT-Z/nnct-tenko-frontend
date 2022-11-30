const Footer = () => {
    const context = {
        copyright: {
            year: 2022,
            organization: '衝撃のイナズマZ'
        }
    }

    return (
        <footer className="fixed w-screen h-12 bottom-0 left-0 bg-slate-100 flex flex-col justify-center items-center">
            <div className="text-slate-900">© { context.copyright.year }, { context.copyright.organization }</div>
        </footer>
    );
}

export default Footer;
