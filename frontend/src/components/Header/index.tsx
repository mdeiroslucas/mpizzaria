import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react'
import styles from './style.module.scss';
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'



export function Header() {

  const { signOut } = useContext(AuthContext)
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          {/* <img src="/logo.svg" width={190} height={60} /> */}
          imagem
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">
            Categoria
          </Link>

          <Link href="/category">
            Cardápio
          </Link>
          <button onClick={signOut}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}