import { Inter } from 'next/font/google'
import styles from '../../styles/Home.module.scss';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Lucas Medeiros</h1>
    </div>
  )
}
