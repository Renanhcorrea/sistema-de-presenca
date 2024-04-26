# Projeto de Prática Profissional em ADS
## Grupo: Unidos do Gametrics

Desenvolvimento do Sistema de Controle de Presença

Escopo do Projeto

O escopo deste projeto é desenvolver um sistema web responsivo para controle de presença. O sistema incluirá recursos básicos de acessibilidade. As funcionalidades planejadas incluem registro de faltas, notificações por e-mail para faltas excessivas e geração de relatórios de faltas por data, ano letivo, turma, professor, disciplina e aluno.

Medidas de segurança do site, além da proteção por senha, não fazem parte do escopo do projeto.


# Passo a Passo para execução local

Após fazer o download do arquivo do projeto e extrair os arquivos, siga os passos a seguir para executar o sistema.

## Criando o Banco de Dados de desenvolvimento/testes

No MySQL Workbench (utilizamos a versão 8.0):
- Crie uma nova conexão, configurando o hostname, port e system profile de acordo com sua máquina. Salve o username, hostname e senha para utilização posterior.
- Utilize o SQL disponível no arquivo “db_octogono.sql” para criar as tabelas necessárias e inserir dados fictícios nela.

## Configurando as  variáveis de ambiente
Na pasta server, utilize o arquivo “.env.example” como referência para a configuração das variáveis de ambiente. 

Crie seu arquivo “.env” substituindo os valores das variáveis de acordo com suas configurações do banco de dados conforme necessário.

## Iniciando os Nodes
Inicie um terminal e verifique se o caminho ao iniciá-lo corresponde ao arquivo “sistema-de-presenca” ou “sistema-de-presenca-main”. Caso não seja, percorra os arquivos até chegar nele.

Entre o comando
```
npm install
```
Em nosso sistema, utilizamos dois nodes: client e server. Primeiro, vamos iniciar o server.

### Iniciando o server
Ainda no terminal, vá para a pasta “server” e insira o comando:
```
npm install
```
E por fim, utilize o comando
```
npm start
```
Você verá no console em qual port o servidor está localizado. Provavelmente, será o 3000.

### Configurando e iniciando o client
Em “client/src/api/utils.js” : modifique o valor da variável API_URL para 'http://localhost:3000' ou outra porta de acordo com a mensagem fornecida ao iniciar o server.

Abra outro terminal e vá para a pasta “client”. Em seguida, utilize novamente o comando:
``` 
npm install
```
Em seguida, insira o comando:
```
npm run dev
```
Utilize o link fornecido para exibir o sistema no navegador.

## Checando a inicialização
Ao abrir a página inicial, o nome da professora deverá ser exibido na sidebar (coluna lateral) acima do cargo “Professor(a)”. Se o nome não aparecer, houve algum problema nas configurações e/ou inicialização, impedindo a comunicação entre o server e client ou client e banco de dados.


# Build production
Logar no Putty, executar o comando para virar sudo:
```
$ sudo su -
```

Executar o script de automação para restart da aplicação:
```
# bash /app/restart-app.sh
```