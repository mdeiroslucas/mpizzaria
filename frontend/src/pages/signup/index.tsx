import { Inter } from 'next/font/google'
import styles from '../../../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/mpizzaria.png';

import Link from 'next/link';

import {Input} from '../../components/ui/input';
import {Button} from '../../components/ui/button';
import { FormEvent, useState, useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';


// const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  
  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      alert('preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }
  
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
          {/* <Image src={logoImg} alt="Logo MPizzaria"/> */}


      <div className={styles.login}>
        <h1>Criando sua conta</h1>
       
        <form onSubmit={handleSignUp}>
          <Input
            placeholder='Digite o seu nome'
            type='text' 
            value={name}       
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='Digite o seu email'
            type='text'        
            value={email}       
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Digite sua senha'
            type='password'
            value={password}       
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
          type="submit"
          loading={loading}>
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
