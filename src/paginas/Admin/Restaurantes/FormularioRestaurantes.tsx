import { Box, Button, TextField,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurantes = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome));
    }
  }, [params]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante atualizado com sucesso"));
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante cadastrado com sucesso"));
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1
        }}
      >
        <Typography>Formulario de restaurantes</Typography>
        <Box component="form" sx={{ width: '100%'}} onSubmit={onSubmit}>
          <TextField
            value={nomeRestaurante}
            onChange={(e) => setNomeRestaurante(e.target.value)}
            id="standard-basic"
            label="Nome do restaurante"
            variant="standard"
            fullWidth
            required
          />
          <Button sx={{ width: '100%', mt: 2}} type="submit" variant="outlined">
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioRestaurantes;
