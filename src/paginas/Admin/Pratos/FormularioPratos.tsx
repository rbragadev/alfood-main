import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPratos = () => {

  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("")
  const [restaurante, setRestaurante] = useState("")
  const [imagem, setImagem] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get< { tags: ITag[]}>('tags/')
    .then(res => setTags(res.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
    .then(res => setRestaurantes(res.data))
  },[])

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length){
        setImagem(e.target.files[0])
    } else {
        setImagem(null)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if(imagem) {
        formData.append('imagem', imagem);
    }

    http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    .then(res => alert('Prato cadastrado com sucesso'))
    .catch(err => console.log(err))

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
        <Typography>Formulario de pratos</Typography>
        <Box component="form" sx={{ width: '100%'}} onSubmit={onSubmit}>
          <TextField
            value={nomePrato}
            onChange={(e) => setNomePrato(e.target.value)}
            id="standard-basic"
            label="Nome do prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            id="standard-basic"
            label="Descrição"
            variant="standard"
            fullWidth
            required
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel id='select-tag'>Tag</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                {tags.map((tag) => <MenuItem key={tag.id} value={tag.value}>
                    {tag.value}
                </MenuItem>)}
            </Select>

          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id='select-restaurante'>Restaurante</InputLabel>
            <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                {restaurantes.map((restaurante) => <MenuItem key={restaurante.id} value={restaurante.id}>
                    {restaurante.nome}
                </MenuItem>)}
            </Select>

          </FormControl>

          <input type="file" onChange={selectFile} />
          <Button sx={{ width: '100%', mt: 2}} type="submit" variant="outlined">
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioPratos;
