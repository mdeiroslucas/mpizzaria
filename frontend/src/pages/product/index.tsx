import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../utils/canSSRAuth';
import { Header } from '../../components/Header'
import {FiUpload} from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';

import { setupAPIClient } from '@/src/services/api';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}



export default function Product({ categoryList }: CategoryProps) {

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState('');

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files){
      return;
    }

    const image = e.target.files[0];

    if(!image){
      return;
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChangeCategory(e: ChangeEvent<HTMLInputElement>) {
    setCategorySelected(e.target.value);
  }

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

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#FFF"/>
              </span>

              <input type='file' accept='image/png, image/jpeg' onChange={handleFile}/>


              {avatarUrl && (
                <img 
                className={styles.preview}
                src={avatarUrl} 
                alt='foto do produto' 
                width={250} 
                height='250' />
              )}

            </label>
            <select value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
             {/* {handleChangeCategory}> */}
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}></option>
                )
              })}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/category');
  return {
    props: {
      categoryList: response.data
    }
  }
})