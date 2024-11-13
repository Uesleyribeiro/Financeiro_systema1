Financeiro_Systema1 é um sistema de gestão financeira desenvolvido para gestores financeiros, com foco nos relatórios financeiros e planejamento estratégico.
O sistema visa facilitar o acompanhamento das finanças, oferecendo uma interface simples e eficiente para gestão de fluxo de caixa e indicadores financeiros.

Descrição
O Financeiro_Systema é uma plataforma completa para controle financeiro, permitindo aos usuários cadastrar suas empresas, configurar planos de contas e fazer upload de planilhas detalhadas para gerenciar transações financeiras. 
O sistema gera relatórios como o DFE (Demonstrativo Financeiro Estratégico), fornecendo informações gerenciais e indicadores-chave de performance (KPIs) para tomada de decisões.

Funcionalidades
Cadastro de empresas e configuração de planos de contas.
Upload de planilhas padronizadas para contas a pagar e contas a receber.
Geração de relatórios financeiros, incluindo o DFE (Demonstrativo Financeiro Estratégico).
Visualização de KPIs e outros indicadores financeiros.
Tecnologias Utilizadas
Backend: Flask (Python)
Frontend: HTML, CSS, JavaScript (React)
Banco de Dados: MySQL/PostgreSQL (dependendo da configuração)
Autenticação: JWT (JSON Web Token)
Outras Ferramentas: Pandas (para manipulação de dados), Matplotlib (para geração de gráficos), Celery (para tarefas assíncronas)
Instalação
Pré-requisitos
Python 3.x
Node.js
MySQL ou PostgreSQL
Passos para Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/Financeiro_Systema1.git
cd Financeiro_Systema1
Crie um ambiente virtual para o Python:

bash
Copiar código
python3 -m venv venv
source venv/bin/activate  # No Windows, use venv\Scripts\activate
Instale as dependências do backend:

bash
Copiar código
pip install -r requirements.txt
Configure o banco de dados no arquivo .env:

bash
Copiar código
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=financeiro_systema1
Execute as migrações do banco de dados:

bash
Copiar código
flask db upgrade
Para iniciar o backend:

bash
Copiar código
flask run
Para iniciar o frontend:

Navegue até a pasta frontend:
bash
Copiar código
cd frontend
npm install
npm start
Uso
Após a instalação, você pode acessar o sistema no navegador, utilizando o endereço http://localhost:5000 (ou o URL configurado).

Funcionalidades Principais
Cadastro de Empresa: Crie e cadastre uma nova empresa com seu respectivo plano de contas.
Relatórios: Acesse os relatórios financeiros e visualize os indicadores chave de desempenho (KPIs).
Planilhas de Contas: Importe planilhas de contas a pagar e contas a receber diretamente no sistema.
Contribuição
Contribuições são bem-vindas! Se você quiser contribuir, siga os seguintes passos:

Faça um fork deste repositório.
Crie uma branch para sua feature (git checkout -b minha-feature).
Faça as modificações necessárias e commit (git commit -am 'Adiciona minha feature').
Envie para o repositório remoto (git push origin minha-feature).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.
