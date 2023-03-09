import { Inter } from 'next/font/google'
import styles from '../../../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/mpizzaria.png';

import Link from 'next/link';

import {Input} from '../../components/ui/input';
import {Button} from '../../components/ui/button';
// const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
          {/* <Image src={logoImg} alt="Logo MPizzaria"/> */}


      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form action="">
          <Input
            placeholder='Digite o seu nome'
            type='text'        
          />
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
            Cadastrar
          </Button>
        </form>

        <Link href='/' className={styles.text}>
          Já possui uma conta? Faça o login!
        </Link>

        </div>
      </div>
    </>
  )
}
