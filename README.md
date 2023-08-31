
# Fullstack Test Software Engineering (Lexart 2023)

Este repositório contém a implementação de um projeto de desenvolvimento completo para a avaliação da Lexart 2023. O projeto consiste em dois componentes principais: um web chatbot interativo e uma simulação de um cyclotron, incluindo algoritmos para acelerar diferentes partículas.
## Referências

 - [Base do meu Chatbot](https://youtu.be/a37BL0stIuM?si=6JeirlLovFqDU4dT)


## Teste a Aplicação

Acesse o [Chatbot Aqui](https://lexart-fullstack-test-software-engineering-frontend-mendri.vercel.app/) e o veja funcionando normalmente

O deploy do backend foi feito no site Render.com, portanto após ficar um tempo inativo a aplicação é desligada, e demora um tempinho para ligar quando é acessada de novo.
## Instalação do Chatbot

- Primeiro entre na pasta do Chatbot (que esta na raiz)

```bash
  cd Chatbot
```

- Depois recomendo criar um ambiente virtual com venv

```bash
  python3 -m venv .venv && source .venv/bin/activate
```

- Por fim instalar as dependencias do projeto

```bash
  python3 -m pip install -r requirements.txt
```
    

## Instalação do Frontend

- Primeiro entre na pasta Frontend (que esta na raiz)

```bash
  cd Frontend
```

- E instalar as dependências

```bash
  npm install
```
## Rodando localmente

Na pasta Frontend é necessário declarar uma variável de ambiente antes de rodar, para isso crie um arquivo .env na pasta Frontend e nele digite:

```
  VITE_API_URL=http://127.0.0.1:5000/
```

Pode ser que a url seja diferente seja diferente, mas se for é só copiar a url que o Flask esta fazendo.

Por fim inicie o Frontend

```bash
  npm run dev
```

E copie a url para seu navegador se não abrir automaticamente.

Já para o Chatbot, também será necessário criar um .env, desta vez o será com a conexão com o banco de dados, então não posso mostrar o meu aqui, mas é fácil criar um com o mongodb atlas e tem um plano de graça, se tiver um coloque no arquivo:

```
  CONNECTION_STRING = suastringmongodbaqui
```

Depois disso será necessário treinar o Chatbot

```bash
  python3 train.py
```

e basta rodar o app.py

```bash
  python3 app.py
```

Com isso em alguma porta do seu localhost um backend Flask começará a rodar.

## Possíveis Melhorias


Dado o prazo e a inexperiência com chatbot, eu tenho uma lista de coisas que melhorar, caso fizesse o desafio de novo.


- TDD, não fiz nenhum teste nessa aplicação, muito por achar que se fizesse não conseguiria fazer a tempo, mas preciso praticar essa metodologia.


- Redux ou ContextAPI, deveria ter pensado um pouco e no início ter escolhido e aplicado uma forma de gerenciamento de estado.


- O chatbot em si, como foi minha primeira experiência e etc... não estou muito contente com o resultado do chatbot em si, então estudarei um pouco sobre NLP e Deep Learning.


- Também caprichar mais no frontend, dava para ter deixado mais bonito.
