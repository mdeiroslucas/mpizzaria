import { Inter } from 'next/font/google'
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';

import logoImg from '../../public/logo.svg';

import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mpizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
          {/* <Image src={logoImg} alt="Logo MPizzaria"/> */}
      </div>

      <div className={styles.login}>
        <form action="">
          <Input
            placeholder='Digite o seu email'
            type='text'        
          />
          <Input
            placeholder='Digite sua senha'
            type='password'
          />

          <Button
          />
        </form>
      </div>
    </>
  )
}
