import express, { application } from 'express';
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
    res.status(201).send('Ok');
});

server.get('/tweets/:name', (req, res) => {
    const name = req.params.name
    const filterTweet = tweets.filter(tweet => tweet.username === name)
    const imgTweet = filterTweet.map(tweet => {
        return {
            ...tweet,
            avatar: users.find(user => user.username === tweet.username).avatar
        }
    })
    if(filterTweet.length === 0) {
        return res.status(404).send('Usuário não identificado!')
    }
    return res.status(200).send(imgTweet)
});

server.get('/tweets', (req, res) => {
    const verificationLatestTweets = tweets.map((tweet) => {
        return {
            ...tweet,
            avatar: users.find(user => user.username === tweet.username).avatar
        }
    })
    res.send(verificationLatestTweets.slice(0, 10))
});

server.post('/tweets', (req, res) => {
    const { username, tweet } = req.body

    if(!username || !tweet) {
        res.status(400).send('Todos os campos são obrigatórios!')
    }

    const publication = req.body;
    tweets.unshift(publication);
    res.status(201).send('Ok');
});

server.listen(5000, () => { console.log('Server rodando na porta 5000') });