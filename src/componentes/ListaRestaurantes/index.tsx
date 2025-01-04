import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((res) => {
        setRestaurantes(res.data.results);
        setNextPage(res.data.next);
      })
      .catch((err) => console.log(err));
  }, []);

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url).then((res) => {
      setRestaurantes(res.data.results);
      setNextPage(res.data.next);
      setPreviousPage(res.data.previous);
    });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <button
        onClick={() => carregarDados(previousPage)}
        disabled={!previousPage}
      >
        Pagina Anterior
      </button>
      <button onClick={() => carregarDados(nextPage)} disabled={!nextPage}>
        Proxima Pagina
      </button>
    </section>
  );
};

export default ListaRestaurantes;
