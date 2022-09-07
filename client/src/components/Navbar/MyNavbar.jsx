import React, { useContext } from 'react';
import { Button, Navbar, NavItem, Icon } from "react-materialize"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const MyNavbar = () => {
    const { logout, isAuth } = useContext(AuthContext)
    let navigate = useNavigate()
    return (
        <Navbar
            className="teal"
            alignLinks="right"
            brand={<Link className="brand-logo" to="/">Crystalgram</Link>}
            // id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'right',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}>
            {
                isAuth &&
                <div className="navbar-btns">
                    <NavItem onClick={() => navigate("/")}>
                        Мой профиль
                    </NavItem>
                    <NavItem onClick={() => navigate("/users")}>
                        Пользователи
                    </NavItem>
                    <NavItem onClick={logout}>
                        Выйти
                    </NavItem>
                    {/* <Link to="/"><Button>Мой профиль</Button></Link>
                    <Link to="/users"><Button>Пользователи</Button></Link>
                    <Button onClick={() => logout()}>Выйти</Button> */}
                </div>
            }
        </Navbar>
    );
}

export default MyNavbar;
