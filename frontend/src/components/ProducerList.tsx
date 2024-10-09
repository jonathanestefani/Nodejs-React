import React from 'react';
import { Producer } from '../interfaces/types';
import { useContext } from 'react';
import { ProducerContext } from '../context/ProducerContext';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ProducerListProps {
  onEdit: (producer: Producer) => void; // Adicione a prop 'onEdit' para a edição
}

const ProducerList: React.FC<ProducerListProps> = ({ onEdit }) => {
  const { producers, deleteProducer } = useContext(ProducerContext);

  const handleDelete = (id: number) => {
    deleteProducer(id);
  };

  return (
    <List>
      {producers.map((producer) => (
        <ListItem key={producer.id}>
          <ListItemText
            primary={producer.nomeProdutor}
            secondary={
              <>
                Fazenda: {producer.nomeFazenda}, Cidade: {producer.cidade}, Estado: {producer.estado}
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(producer)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(producer.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ProducerList;
