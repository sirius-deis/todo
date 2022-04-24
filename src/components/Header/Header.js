import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <i className="fa-solid fa-square-check header__logo"></i>
            <h1 className='header__heading'>My Todo-s</h1>
        </div>
    );
}

export default Header;