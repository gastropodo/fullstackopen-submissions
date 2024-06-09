export const updateBookCache = (cache, query, addedBook) => {
    const uniqByTitle = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    cache.updateQuery(query, (cacheData) => {
        if (cacheData) {
            return {
                allBooks: uniqByTitle(cacheData.allBooks.concat(addedBook)),
            };
        }
        return;
    });
};
