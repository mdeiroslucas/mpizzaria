import Head from "next/head"
import { canSSRAuth } from "../utils/canSSRAuth"

import { Header } from '../../components/Header'

export default function Dashboard(){
  return (
    <>
      <Head>
        <title>Painel - Medeiros Restaurante</title>
      </Head>
      <div>
        <Header></Header>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
  return {
    props:{}
  }
})