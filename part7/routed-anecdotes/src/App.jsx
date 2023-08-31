import { useState } from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import AnecdoteList from './components/AnecdoteList';
import Menu from './components/Menu';
import About from './components/About';
import Footer from './components/Footer';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
    const navigate = useNavigate();
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ]);

    const [notification, setNotification] = useState('');

    const raiseNotification = (text, seconds = 5) => {
        setNotification(text);
        setTimeout(() => setNotification(''), seconds * 1000);
    };

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        raiseNotification(`A new anecdote ${anecdote.content} created!`);
        navigate('/');
    };

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };

    const match = useMatch('/anecdotes/:id');
    const anecdote = match
        ? anecdoteById(Number(match.params.id))
        : null;

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification text={notification} />
            <Routes>
                <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path='/create' element={<AnecdoteForm addNew={addNew} />} />
                <Route path='/about' element={<About />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
