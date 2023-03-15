import Head from "next/head";
import { Header } from "@/src/components/Header";
import styles from './style.module.scss'
import { FormEvent, useState } from "react";

import {setupAPIClient} from "../../services/api"
import { toast } from "react-toastify";
import { canSSRAuth } from "../utils/canSSRAuth";

export default function Category() {

  const [name, setName] = useState('');

  async function handleRegister(event: FormEvent){
    event.preventDefault();
    if (name === '') {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso')
    setName('');
  }
  
  return (
    <>
      <Head>
        <title>Nova Categoria - Medeiros Restaurante</title>
      </Head>
      <div>

        <Header></Header>

        <main className={styles.container}>
          <h1>Cadastrar Categoria</h1>

          <form action="" onSubmit={handleRegister}>
            <input 
            type="text"
            placeholder="Digite o nome da categoria"
            className={styles.input}
            value={name}
            onChange={ (e) => setName(e.target.value)}
             />

             <button className={styles.buttonAdd} type="submit">
                Cadastrar
             </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})