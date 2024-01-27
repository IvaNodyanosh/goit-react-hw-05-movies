import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from "./Header.module.css"

const Header = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <nav className={css.nav}>
            <ul className={css.nav__list}>
              <li className={css.nav__item}>
                <NavLink to="/" className={css.nav__link}>
                  Home
                </NavLink>
              </li>
              <li className={css.nav__item}>
                <NavLink to="/movies" className={css.nav__link}>
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className={`${css.container} ${css.container__main}`}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Header;
