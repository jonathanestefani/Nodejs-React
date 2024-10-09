import React, { createContext, useState, ReactNode } from 'react';
import { Producer } from '../interfaces/types';

interface ProducerContextType {
  producers: Producer[];
  addProducer: (producer: Producer) => void;
  editProducer: (id: number, updatedProducer: Producer) => void;
  deleteProducer: (id: number) => void;
}

const defaultProducers: Producer[] = [];

export const ProducerContext = createContext<ProducerContextType>({
  producers: defaultProducers,
  addProducer: () => {},
  editProducer: () => {},
  deleteProducer: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ProducerProvider: React.FC<ProviderProps> = ({ children }) => {
  const [producers, setProducers] = useState<Producer[]>(defaultProducers);

  const addProducer = (producer: Producer) => {
    setProducers((prevProducers) => [...prevProducers, producer]);
  };

  const editProducer = (id: number, updatedProducer: Producer) => {
    setProducers((prevProducers) =>
      prevProducers.map((producer) => (producer.id === id ? updatedProducer : producer))
    );
  };

  const deleteProducer = (id: number) => {
    setProducers((prevProducers) => prevProducers.filter((producer) => producer.id !== id));
  };

  return (
    <ProducerContext.Provider value={{ producers, addProducer, editProducer, deleteProducer }}>
      {children}
    </ProducerContext.Provider>
  );
};
