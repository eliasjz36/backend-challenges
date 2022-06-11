const genRandomNumbers = (cant) => {
	const randoms = [];

	for (let i = 0; i < cant; i++) {
		const num = Math.floor(Math.random() * (1000 - 1) + 1);
		const cantRepeated = randoms.filter((r) => r.num === num).length;
		randoms.push({ num, cantRepeated });
	}

	randoms.sort((a, b) => a.cantRepeated - b.cantRepeated);

	return randoms;
};

process.on('message', (num) => {
	const numbers = genRandomNumbers(num);

	process.send(numbers);
});
