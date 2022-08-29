import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const users = [
    {
        username: 'bobesponja', 
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    }
];

const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
];

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    if(!username || !avatar) {
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    const user = req.body;
    users.push(user);
    res.send(user);
});

server.get('/tweets', (req, res) => {
    res.send(tweet)
});

console.log(tweet)

server.listen(5000);