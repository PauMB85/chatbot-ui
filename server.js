const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const frases = [
	'Hola, ¿cómo estás?',
	'¡Bienvenido al servidor Express!',
	'Estoy aprendiendo algo nuevo cada día.',
	'La programación es emocionante.',
	'¡Hola desde el servidor!',
	'Node.js facilita la creación de servidores.',
	'¿Cuál es tu lenguaje de programación favorito?',
	'Express es genial para construir APIs.',
	'El aprendizaje continuo es clave en la programación.',
	'¡Que tengas un gran día!',
];

app.post('/conversation', (req, res) => {
	const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
	res.status(200).json({ content: fraseAleatoria });
});

// Agrega más rutas según tus necesidades

app.listen(PORT, () => {
	console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
