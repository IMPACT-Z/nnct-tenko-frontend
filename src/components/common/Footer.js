const Footer = ({data}) => {
    return (
        <footer className="fixed w-screen h-12 bottom-0 left-0 bg-slate-100 flex flex-col justify-center items-center">
            <div className="text-slate-900">© { data.copyright.year }, { data.copyright.organization }</div>
        </footer>
    );
}

export default Footer;
