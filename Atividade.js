/*1a) Rotas não uniformes*/

/*1B) Corrigindo as rotas, e deixando-as uniformes pos estão incoretas, nm mesmo estão no nivel 1*/

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];

app.post('/users', (req, res) => { 
const newUser = { id: users.length + 1, ...req.body }; 
users.push(newUser); 
res.status(201).json(newUser); 
}); 

app.get('/users', (req, res) => { 
res.status(200).json(users); 
}); 

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})

//2A) Erro se ocorre pela falta do código 200 e o 404
// B )
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})

// 3A) O método Put atualiza por inteiro e o Patch de maneira parcial
//B) 
app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item não encontrado' });
    } 
    });

//4)// a) Explique o que é HATEOAS e por que ele é importante no modelo REST.
/* HATEOAS é um acrônimo para Hypermedia As The Engine Of Application State, que é uma
restrição de arquitetura que diz que a API deve retornar links para que o cliente possa 
navegar pela API. Isso é importante para que o cliente não precise conhecer a API de 
antemão, apenas seguir os links que a API retorna.*/

// b) Altere o código para incluir links HATEOAS na resposta da API.
function addLinks(user) {
    return {
        self: { href: `/users/${user.id}` },
        delete: { href: `/users/${user.id}`, method: 'DELETE' },
        update: { href: `/users/${user.id}`, method: 'PUT' },
        partialUpdate: { href: `/users/${user.id}`, method: 'PATCH' }
    };
}

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json({
            ...user,
            links: addLinks(user),
        });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 5
// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id === id);
//     if (user) {
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({ message: 'Usuário não encontrado' });
//     }
// });

// a) Qual é o problema relacionado à validação nesse código?
// Teve que converter o id para inteiro para fazer a comparação.

// b) Corrija o código para incluir a validação adequada.
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 6
// app.post('/users', (req, res) => {
//     const newUser = { id: users.length + 1, ...req.body };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// a) Qual é o problema de segurança com a falta de validação no corpo da requisição?
// Ele não valida se o campo name está presente.

// b) Corrija o código para validar se o campo name está presente e atende a requisitos básicos, como ser uma string com pelo menos 3 caracteres.
app.post('/users', (req, res) => {
    const name = parseInt(req.params.id);
    if (!name || name.length < 3) {
        res.status(400).json({ message: 'O campo name é obrigatório e deve ter pelo menos 3 caracteres' });
        return;
    } else {
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        res.status(201).json(newUser);
    }
});
