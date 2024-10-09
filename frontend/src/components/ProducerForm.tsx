import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Grid, Typography, MenuItem } from '@mui/material';
import InputMask from 'react-input-mask';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import api from '../services/api'; // Importar a instância do Axios
import { ProducerContext } from '../context/ProducerContext';
import { Producer } from '../interfaces/types'; // Importa os tipos definidos
import { Country } from '../interfaces/Country'; // Importa os tipos definidos
import { State } from '../interfaces/State'; // Importa os tipos definidos
import { City } from '../interfaces/City'; // Importa os tipos definidos
import { Crop } from '../interfaces/Crop'; // Importa os tipos definidos

interface ProducerFormProps {
  existingProducer?: Producer | null;
  onSave?: () => void;
}

const ProducerForm: React.FC<ProducerFormProps> = ({ existingProducer, onSave }) => {
  const { addProducer, editProducer } = useContext(ProducerContext);

  // Estado inicial do formulário
  const [formData, setFormData] = useState<Producer>({
    id: Math.random(),
    cpfOuCnpj: '',
    nomeProdutor: '',
    nomeFazenda: '',
    cidade: '',
    estado: '',
    areaTotal: 0,
    areaAgricultavel: 0,
    areaVegetacao: 0,
    culturas: [],
  });

  // Estado para armazenar dados carregados da API
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);

  // Preencher o formulário com os dados do produtor existente, se for edição
  useEffect(() => {
    if (existingProducer) {
      setFormData(existingProducer);
    }
  }, [existingProducer]);

  // Carregar dados do backend ao montar o componente
  useEffect(() => {
    // Carregar países, estados, regiões, cidades e culturas
    const fetchData = async () => {
      try {
        const statesResponse = await api.get('/locations/states');
        const cropsResponse = await api.get('/rural-producers-crops');

        console.log(statesResponse.data || []);

        setStates(statesResponse.data || []);
        setCrops([]);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const loadCities = async (state_id: number) => {
    const citiesResponse = await api.get('/locations/cities?filters[state_id]=' + state_id);
    setCities(citiesResponse.data || []);
  }

  // Atualiza o estado conforme os campos são preenchidos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "estado") {
      console.log(e);
      loadCities(parseInt(e.target.value));
    }
  };

  // Manipula a seleção de culturas
  const handleCulturesChange = (cultura: string) => {
    setFormData((prevData) => ({
      ...prevData,
      culturas: prevData.culturas.includes(cultura)
        ? prevData.culturas.filter((c) => c !== cultura)
        : [...prevData.culturas, cultura],
    }));
  };

  // Valida e envia o formulário ao backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remove a formatação de CPF/CNPJ antes de validar
    const cleanedCpfOuCnpj = formData.cpfOuCnpj.replace(/[^\d]/g, '');

    // Validação de CPF/CNPJ
    if (!cpf.isValid(cleanedCpfOuCnpj) && !cnpj.isValid(cleanedCpfOuCnpj)) {
      alert('CPF ou CNPJ inválido');
      return;
    }

    // Validação da soma das áreas
    const somaAreas = formData.areaAgricultavel + formData.areaVegetacao;
    if (somaAreas > formData.areaTotal) {
      alert('A soma das áreas agricultável e vegetação não pode ser maior que a área total.');
      return;
    }

    // Verifica se estamos editando ou criando um novo produtor
    try {
      if (existingProducer) {
        await api.put(`/rural-producers/${formData.id}`, formData);
        editProducer(formData.id, formData);
      } else {
        await api.post('/rural-producers', formData);
        addProducer(formData);
      }

      if (onSave) onSave(); // Chama callback para fechar o formulário após salvar
    } catch (error) {
      console.error('Erro ao salvar produtor:', error);
    }
  };

  // Determina a máscara com base no comprimento do CPF/CNPJ
  const mask = formData.cpfOuCnpj.length <= 14 ? '999.999.999-99' : '99.999.999/9999-99';

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {existingProducer ? 'Editar Produtor' : 'Cadastrar Produtor'}
      </Typography>

      <Grid container spacing={2}>
        {/* Campo CPF ou CNPJ com máscara */}
        <Grid item xs={12}>
          <InputMask mask={mask} value={formData.cpfOuCnpj} onChange={handleChange}>
            {() => (
              <TextField
                label="CPF ou CNPJ"
                name="cpfOuCnpj"
                variant="outlined"
                value={formData.cpfOuCnpj}
                fullWidth
                required
              />
            )}
          </InputMask>
        </Grid>

        {/* Campos de localização: País, Estado, Cidade */}
        <Grid item xs={12}>
          <TextField
            select
            label="País"
            name="pais"
            value={formData.estado}
            onChange={handleChange}
            fullWidth
            required
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={(e: any) => handleChange(e)}
            fullWidth
            required
          >
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            label="Cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            fullWidth
            required
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Área total e uso do solo */}
        <Grid item xs={4}>
          <TextField
            label="Área Total (ha)"
            name="areaTotal"
            variant="outlined"
            value={formData.areaTotal}
            onChange={handleChange}
            type="number"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Área Agricultável (ha)"
            name="areaAgricultavel"
            variant="outlined"
            value={formData.areaAgricultavel}
            onChange={handleChange}
            type="number"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Área de Vegetação (ha)"
            name="areaVegetacao"
            variant="outlined"
            value={formData.areaVegetacao}
            onChange={handleChange}
            type="number"
            fullWidth
            required
          />
        </Grid>

        {/* Culturas plantadas */}
        <Grid item xs={12}>
          <Typography variant="h6">Culturas Plantadas</Typography>
          <div>
            {crops.map((cultura: Crop) => (
              <FormControlLabel
                key={cultura.id} // Use a propriedade 'id' como chave
                control={
                  <Checkbox
                    checked={formData.culturas.includes(cultura.name)} // Verifica pela propriedade 'name'
                    onChange={() => handleCulturesChange(cultura.name)} // Passa o nome da cultura para a função de controle
                  />
                }
                label={cultura.name} // Exibe o nome da cultura
              />
            ))}
          </div>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {existingProducer ? 'Salvar Alterações' : 'Cadastrar Produtor'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProducerForm;