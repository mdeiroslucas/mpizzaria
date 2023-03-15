import Head from "next/head";
import { Header } from "@/src/components/Header";
import styles from './style.module.scss'
import { FormEvent, useState } from "react";

export default function Category() {

  const [name, setName] = useState('');

  async function handleRegister(event: FormEvent){
    event.preventDefault();
    alert('Nome ' + name);
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