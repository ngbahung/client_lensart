import Logo from "../components/logo";

const Header = () => {
    return (
        <header className="bg-dark-bckground sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8">
            <Logo />
            
        </header>
    );
};

export default Header;