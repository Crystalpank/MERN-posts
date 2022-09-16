import React, { useContext, useEffect, useState } from 'react';
import { Button, Navbar, NavItem, Icon } from "react-materialize"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const MyNavbar = () => {
    const { logout, isAuth } = useContext(AuthContext)
    const [instance, setInstance] = useState(null)
    let navigate = useNavigate()
    useEffect(() => {
        const sideNav = document.querySelector(".sidenav");
        window.M.Sidenav.init(sideNav, { edge: "right" });
        setInstance(window.M.Sidenav.getInstance(sideNav));
    }, []);

    const redirect = (to) => {
        navigate(to)
        instance.close()
    }

    return (
        <div className="header">
            <nav className="nav-wrapper teal">

                <div className="container ">


                    <a href="#!" className="brand-logo">Crystalgram</a>
                    {isAuth && <a href="#" data-target="mobile-demo" className="sidenav-trigger"><Icon>menu</Icon></a>}
                    {
                        isAuth &&
                        <ul className="right hide-on-med-and-down">
                            <li><a onClick={() => navigate("/")}>Мой профиль</a></li>
                            <li><a onClick={() => navigate("/users")}>Пользователи</a></li>
                            <li><a onClick={() => logout()}>Выйти</a></li>
                        </ul>
                    }

                </div>


            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><div className="nav-item_btns" onClick={() => redirect("/")}>Мой профиль</div></li>
                <li><div className="nav-item_btns" onClick={() => redirect("/users")}>Пользователи</div></li>
                <li><div className="nav-item_btns" onClick={() => logout()}>Выйти</div></li>
            </ul>
        </div>
        // <Navbar
        //     className="teal"
        //     alignLinks="right"
        //     brand={<Link className="brand-logo" to="/">Crystalgram</Link>}
        //     // id="mobile-nav"
        //     menuIcon={<Icon>menu</Icon>}
        //     options={{
        //         draggable: true,
        //         edge: 'right',
        //         inDuration: 250,
        //         onCloseEnd: null,
        //         onCloseStart: null,
        //         onOpenEnd: null,
        //         onOpenStart: null,
        //         outDuration: 200,
        //         preventScrolling: true
        //     }}>

        //     {
        //         isAuth &&
        //         <div className="navbar-btns">

        //             <NavItem className="nav-item_btns" onClick={() => navigate("/")}>
        //                 Мой профиль
        //             </NavItem>
        //             <NavItem className="nav-item_btns" onClick={() => navigate("/users")}>
        //                 Пользователи
        //             </NavItem>
        //             <NavItem className="nav-item_btns" onClick={logout}>
        //                 Выйти
        //             </NavItem>
        //             {/* <Link to="/"><Button>Мой профиль</Button></Link>
        //             <Link to="/users"><Button>Пользователи</Button></Link>
        //             <Button onClick={() => logout()}>Выйти</Button> */}
        //         </div>
        //     }
        // </Navbar>
    );
}

export default MyNavbar;
