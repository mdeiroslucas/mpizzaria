import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../utils/canSSRAuth';
import { Header } from '../../components/Header'


export default function Product() {
  return (
    <>
      <Head>
        <title>Novo Produto - Medeiros Restaurante</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <select>
              <option>
                Bebida
              </option>
              <option>
                Aperitivo
              </option>
            </select>

            <input
              type='text'
              placeholder='Digite o nome do produto'
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Digite o preçp do produto'
              className={styles.input}
            />
            <textarea
              placeholder='Descreva seu produto...'
              className={styles.input}
            />

            <button className={styles.buttonAdd} type='submit'>
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