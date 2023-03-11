import { Inter } from 'next/font/google'
import styles from '../../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/mpizzaria.png';

import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';

import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import { FormEvent, useContext, useState } from 'react';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if (email === '' || password ==='') {
      alert('preencha os dados')
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    };

    await signIn(data);

    setLoading(false);
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
            value= {email}     
            onChange={ (e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Digite sua senha'
            type='password'
            value= {password}     
            onChange={ (e) => setPassword(e.target.value)}
          />

          <Button
          type="submit"
          loading={loading}>
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
