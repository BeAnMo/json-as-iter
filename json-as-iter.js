const isArray = Array.isArray;
const isObject = x => typeof (x) === 'object' && !(x === null || isArray(x));
const isCompound = x => isArray(x) || isObject(x);

function* enumerate(items) {
    if (isArray(items)) {
        let i = 0;

        for (const item of items) {
            yield [i++, item];
        }
    } else {
        for (const key of Object.keys(items)) {
            yield [key, items[key]];
        }
    }
}

function* traverseDf({ current, parent }, path, refs) {
    const iter = enumerate(current);

    for (const [key, value] of iter) {
        const nextPath = [...path, key];

        if (isCompound(value)) {
            if (!refs.has(current)) {
                yield* traverseDf(
                    { current: value, parent: current },
                    nextPath,
                    refs.add(current)
                );
            }
        } else {
            yield {
                key,
                value,
                path: nextPath,
                parent: { current, parent },
            };
        }
    }
}

function jsonIterDF(doc) {
    let refs = new WeakSet();

    return traverseDf({ current: doc, parent: null }, [], refs);
}
