const axios = require('axios');
const faker = require('faker');
const { fake } = require('faker');

const IDEA_GENERATOR = 'https://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:3000';

const randomInt = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
    const { data } = await axios.get(IDEA_GENERATOR);
    return data.replace(/\n/g, '');
}

const generateUser = async () => {
    const newUser = {
        email: faker.internet.email(),
        password: 'password'
    }
    const { data } = await axios.post(`${IDEA_API}/api/users/register`, newUser);
    return data.token;
}

const postNewIdea = async token => {
    const idea = await generateIdea();
    const { data } = await axios.post(`${IDEA_API}/api/ideas`, {
        idea,
        description: faker.lorem.words(10)
    }, {
        headers: { authorization: `Bearer ${token}` }
    });

    console.log(data);
    return idea;
}

(async () => {
    const randomUserNum = randomInt();
    const randomIdeaNum = randomInt();

    for (let i = 0; i < randomUserNum; i++) {
        const token = await generateUser();
        for (let x = 0; x < randomIdeaNum; x++) {
            const idea = await postNewIdea(token);
        }
    }
})()