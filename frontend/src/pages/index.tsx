import { Inter } from 'next/font/google'
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mpizzaria - Faça seu Login</title>
      </Head>
      <div>
          <h1>MPizzaria</h1>
      </div>
    </>
  )
}
