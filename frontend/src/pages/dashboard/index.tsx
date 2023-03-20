import Head from "next/head"
import { canSSRAuth } from "../utils/canSSRAuth"
import styles from './styles.module.scss';
import { useState } from "react";

import { Header } from '../../components/Header'
import { FiRefreshCcw } from "react-icons/fi";

import { setupAPIClient } from "@/src/services/api";

import Modal from 'react-modal';
import { ModalOrder } from "../../components/ModalOrder";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
}

export default function Dashboard({ orders }: HomeProps) {

  const [orderList, setOrderList] = useState<OrderProps[]>(orders || []);
  
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
  
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){

    const apiCLient = setupAPIClient();

    const response = await apiCLient.get('/orders/detail', {
      params: {
        order_id: id,
      }
    })

    setModalItem(response.data);
    setModalVisible(true);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Painel - Medeiros Restaurante</title>
      </Head>
      <div>
        <Header></Header>

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color='#3fffa3' />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.map( item => (
            <section key={item.id} className={styles.orderItem}>
              <button onClick= { () => handleOpenModalView(item.id) }>
                <div className={styles.tag}></div>
                <span>Mesa {item.table}</span>
              </button>
            </section>
            ))}


          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data || []
    }
  }
})