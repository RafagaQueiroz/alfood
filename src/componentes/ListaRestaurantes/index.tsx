import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { TextField } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  function buscarRestaurantes(filtro?: string) {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
      params: {
        search: filtro,
      }
    })
    .then(resposta => {
      setRestaurantes(resposta.data.results)
      setProximaPagina(resposta.data.next)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  useEffect(() => {
    buscarRestaurantes()
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form>
      <TextField
        placeholder="Digite para buscar restaurantes"
        label="Nome do Restaurante"
        variant="standard"
        fullWidth={true}
        margin="normal"
        onChange={evento => buscarRestaurantes(evento.target.value)}
      />
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      Ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes