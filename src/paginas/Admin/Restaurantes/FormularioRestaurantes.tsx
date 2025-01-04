import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurantes = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`
        )
        .then((res) => setNomeRestaurante(res.data.nome));
    }
  }, [params]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante atualizado com sucesso"));
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante cadastrado com sucesso"));
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={nomeRestaurante}
        onChange={(e) => setNomeRestaurante(e.target.value)}
        id="standard-basic"
        label="Nome do restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurantes;
