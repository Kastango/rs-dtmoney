import Modal from 'react-modal';

import outcomeImg from '../../assets/outcome.svg'
import incomeImg from '../../assets/income.svg'
import closeImage from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useState, FormEvent } from 'react';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value, 
      category,
      type,
    };

    api.post('/transactions', data)

  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImage} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transacão</h2>

        <input 
          placeholder="Título" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
        />
        <input 
          placeholder="Valor" 
          type="number"
          value={value} 
          onChange={e => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            isActive={type === 'deposit'} 
            activeColor="green"
            type="button" 
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            isActive={type === 'withdraw'} 
            activeColor="red"
            type="button" 
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category} 
          onChange={e => setCategory(e.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
   </Modal>
  );
};

