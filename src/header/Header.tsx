import { Link } from "react-router-dom"
import s from "./Header.module.css"

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <Link to="/">MyNotes</Link>
      </div>
      <nav className={s.nav}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
