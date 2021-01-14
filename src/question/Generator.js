import Items from "../items.json";

const numberOfOptions = 7;

const randomSort = (array) => {
    let randomized = [...array];

    randomized.sort(() => Math.round(Math.random() * (1 + 1) + -1));

    return randomized;
}

const getRandom = (array, n) => randomSort(array).slice(0, n);

const itemsWithComponents = Items.items.filter(x => x.components?.length);

const getQuestion = () => {
    const index = Math.floor(Math.random() * itemsWithComponents.length);
    const item = itemsWithComponents[index];
    const answers = Items.items.filter(i => item.components.includes(i.id));
    const fillers = getRandom(Items.items.filter(i => i.id !== item.id), numberOfOptions - answers.length);

    item.options = randomSort([...answers, ...fillers]);

    console.debug("Random question generated", item);
    return item;
}

export default getQuestion;
