import React, { useState } from 'react';
import { importarExtrato } from '../services/api';

interface ImportarExtratoProps {
  contaBancariaId: number;
  onImportacaoConcluida: () => void;
}

const ImportarExtrato: React.FC<ImportarExtratoProps> = ({ contaBancariaId, onImportacaoConcluida }) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arquivo) {
      setMensagem('Por favor, selecione um arquivo CSV para importar.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);

      const response = await importarExtrato(contaBancariaId, formData);
      setMensagem(response.message);
      onImportacaoConcluida();
    } catch (error) {
      setMensagem('Erro ao importar o extrato. Por favor, tente novamente.');
      console.error('Erro ao importar extrato:', error);
    }
  };

  return (
    <div>
      <h2>Importar Extrato Bancário</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Importar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default ImportarExtrato;
