const Footer = (props) => {
    return (
        <footer class="fixed w-screen h-12 bottom-0 left-0 bg-slate-100 flex flex-col justify-center items-center">
            <div class="text-slate-900">© { props.data.copyright.year }, { props.data.copyright.organization }</div>
        </footer>
    );
}

export default Footer;
