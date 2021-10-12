import { useState, FormEvent} from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../Hooks/useTransactions';

import outcomeImg from '../../assets/outcome.svg'
import incomeImg from '../../assets/income.svg'
import closeImage from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit')
    onRequestClose()
        
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
          value={amount} 
          onChange={e => setAmount(Number(e.target.value))}
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

