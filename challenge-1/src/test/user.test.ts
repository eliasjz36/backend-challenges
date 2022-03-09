import User from "../user";

describe("User", () => {
	let user: User;

	beforeEach(() => {
		user = new User(
			"Elias",
			"Jimenez",
			[
				{ name: "I, Robot", author: "Isaac Asimov" },
				{ name: "Klara and the Sun", author: "Kazuo Ishiguro" },
			],
			["dog", "cat"]
		);
	});

	describe("fullName", () => {
		it("should return 'Elias Jimenez' when name is 'Elias' and last name is 'Jimenez'", () => {
			// Prepare a spy for the user.fullName get method.
			const spy = jest.spyOn(user, "fullName", "get");

			const expected = "Elias Jimenez";
			const received = user.fullName;

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toBe(expected);
		});
	});

	describe("countPets", () => {
		it("should return 2 when pets array have two values", () => {
			// Prepare a spy for the user.countPets get method.
			const spy = jest.spyOn(user, "countPets", "get");

			const expected = 2;
			const received = user.countPets;

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toBe(expected);
		});
	});

	describe("bookNames", () => {
		it("should return ['I, Robot', 'Klara and the Sun'] when user's books are two, 'I, Robot' and 'Klara and the Sun'", () => {
			// Prepare a spy for the user.bookNames get method.
			const spy = jest.spyOn(user, "bookNames", "get");

			const expected = ["I, Robot", "Klara and the Sun"];
			const received = user.bookNames;

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toStrictEqual(expected);
		});
	});

	describe("books", () => {
		it("should return the books array with two books, 'I, Robot' and 'Klara and the Sun'", () => {
			// Prepare a spy for the user.fullName get method.
			const spy = jest.spyOn(user, "books", "get");

			const expected = [
				{ name: "I, Robot", author: "Isaac Asimov" },
				{ name: "Klara and the Sun", author: "Kazuo Ishiguro" },
			];
			const received = user.books;

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toStrictEqual(expected);
		});
	});

	describe("pets", () => {
		it("should return the pets array with two values, 'dog' and 'cat'", () => {
			// Prepare a spy for the user.fullName get method.
			const spy = jest.spyOn(user, "pets", "get");

			const expected = ["dog", "cat"];
			const received = user.pets;

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toStrictEqual(expected);
		});
	});

	describe("pet", () => {
		it("should append 'cat' to user.pets[]", () => {
			// Prepare a spy for the user.fullName get method.
			const spy = jest.spyOn(user, "pet", "set");

			// Save a new pet in the books array
			user.pet = "cat";

			// Get the pets array
			const pets = user.pets;

			// Check if the pet is already in the array
			const received = pets.find((pet) => pet === "cat");

			const expected = "cat";

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toBe(expected);
		});
	});

	describe("book", () => {
		it("should append { name: 'The Psychology of Money', author: 'Morgan Housel' } to user.books[]", () => {
			// Prepare a spy for the user.fullName get method.
			const spy = jest.spyOn(user, "book", "set");

			// Save a new book in the books array
			user.book = {
				name: "The Psychology of Money",
				author: "Morgan Housel",
			};

			// Get the books array
			const books = user.books;

			// Check if the book is already in the array
			const received = books.find(
				(book) => book.name === "The Psychology of Money"
			);

			const expected = {
				name: "The Psychology of Money",
				author: "Morgan Housel",
			};

			// Check if the method was called.
			expect(spy).toHaveBeenCalled();

			// Check if we received what we expected
			expect(received).toStrictEqual(expected);
		});
	});
});
