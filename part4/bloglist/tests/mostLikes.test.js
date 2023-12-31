const { mostLikes } = require('../utils/list_helper');

describe('most likes', () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    const blogs_two_top = blogs.concat({
        _id: "5a422a851b54a676234d17f6",
            title: "Test blog",
            author: "Michael Chan",
            url: "test url",
            likes: 10,
            __v: 0
    })

    test('no blogs, returns null', () => {
        expect(mostLikes([])).toEqual(null);
    });

    test('only one blog, return the author of that blog', () => {
        const blog = blogs[0];
        expect(mostLikes([blog])).toEqual({
            author: "Michael Chan",
            likes: 7
        });
    });

    test('one top author, returns that', () => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        });
    });

    test('two or more top author, returns first one to reach top likes', () => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        });
    });
});