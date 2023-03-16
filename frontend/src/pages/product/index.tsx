import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../utils/canSSRAuth';
import { Header } from '../../components/Header'
import {FiUpload} from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';

import { setupAPIClient } from '@/src/services/api';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}

interface CategoryMap {
  [key: string]: ItemProps;
}



export default function Product({ categoryList }: CategoryProps) {

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const [categories, setCategories] = useState<ItemProps[]>(categoryList || []);
  const [categorySelected, setCategorySelected] = useState<number>(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>): void{
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

  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>): void {
    const value = Number(e.target.value);
    setCategorySelected(value);
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const data = new FormData();

      if (name === '' || price === '' || description === '' || imageAvatar === null) {
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('file', imageAvatar as File);
      data.append('category_id', categories[categorySelected].id);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Produto cadastrado com sucesso!');

      setName('');
      setPrice('');
      setDescription('');
      setImageAvatar(null);
      setAvatarUrl('');


    } catch (error) {
      console.log('erro na hora de registrar o produto' + error)
      toast.error("Erro ao cadastrar o produto!");
    }
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

          <form className={styles.form} onSubmit={handleRegister}>

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
            <select value={categorySelected} onChange={handleChangeCategory}>
             
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              type='text'
              placeholder='Digite o nome do produto'
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Digite o preço do produto'
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder='Descreva seu produto...'
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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