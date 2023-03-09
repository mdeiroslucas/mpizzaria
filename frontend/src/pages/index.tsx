import { Inter } from 'next/font/google'
import styles from '../../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/mpizzaria.png';

import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';

import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import { FormEvent, useContext } from 'react';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {signIn} = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email: 'alguem@',
      password: '123213'
    };

    await signIn(data);
  }
  return (
    <>
      <Head>
        <title>Mpizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
          {/* <Image src={logoImg} alt="Logo MPizzaria"/> */}


      <div className={styles.login}>
      <h1>MPIZZARIA</h1>
        <form onSubmit={handleLogin}>
          <Input
            placeholder='Digite o seu email'
            type='text'        
          />
          <Input
            placeholder='Digite sua senha'
            type='password'
          />

          <Button
          type="submit"
          loading={false}>
            Acessar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Nao possui uma conta? Cadastre-se!
        </Link>

        </div>
      </div>
    </>
  )
}
