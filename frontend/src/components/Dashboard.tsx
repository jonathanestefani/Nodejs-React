import React, { useContext } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ProducerContext } from '../context/ProducerContext';
import { Producer } from '../interfaces/types';

// Cores usadas nos gráficos de pizza
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Dashboard: React.FC = () => {
  const { producers } = useContext(ProducerContext);

  // Função para calcular o total de fazendas
  const totalFazendas = producers.length;

  // Função para calcular o total de hectares
  const totalHectares = producers.reduce((total, producer) => total + producer.areaTotal, 0);

  // Função para calcular o total de áreas agricultáveis e vegetação
  const usoSolo = producers.reduce(
    (acc, producer) => {
      acc.agricultavel += producer.areaAgricultavel;
      acc.vegetacao += producer.areaVegetacao;
      return acc;
    },
    { agricultavel: 0, vegetacao: 0 }
  );

  // Função para gerar a distribuição de produtores por estado
  const dataPorEstado = producers.reduce((acc: Record<string, number>, producer: Producer) => {
    const { estado } = producer;
    if (!acc[estado]) {
      acc[estado] = 1;
    } else {
      acc[estado]++;
    }
    return acc;
  }, {});

  // Função para gerar a distribuição de culturas plantadas
  const dataPorCultura = producers.reduce((acc: Record<string, number>, producer: Producer) => {
    producer.culturas.forEach((cultura) => {
      if (!acc[cultura]) {
        acc[cultura] = 1;
      } else {
        acc[cultura]++;
      }
    });
    return acc;
  }, {});

  // Transforma os dados dos estados e culturas em formato para o gráfico
  const estadoData = Object.entries(dataPorEstado).map(([name, value]) => ({ name, value }));
  const culturaData = Object.entries(dataPorCultura).map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de Fazendas
      </Typography>

      <Grid container spacing={3}>
        {/* Exibe o total de fazendas e hectares */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Total de Fazendas</Typography>
            <Typography variant="body1">{totalFazendas}</Typography>

            <Typography variant="h6" sx={{ marginTop: 2 }}>Total de Hectares</Typography>
            <Typography variant="body1">{totalHectares} hectares</Typography>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Distribuição por Estado */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Distribuição por Estado</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={estadoData}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {estadoData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Distribuição por Cultura */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Distribuição por Cultura</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={culturaData}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {culturaData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Uso do Solo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Uso do Solo</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={[
                  { name: 'Agrícola', value: usoSolo.agricultavel },
                  { name: 'Vegetação', value: usoSolo.vegetacao },
                ]}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
