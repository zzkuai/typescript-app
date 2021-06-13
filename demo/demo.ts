const a = 1;

function getDouble(x, y) {
  return x * y;
}

const num = getDouble('1', '2');

const func = (str: string): number => {
  return parseInt(str);
};

const func1: (str: string) => number = (str) => {
  return parseInt(str);
};

interface Person {
  readonly name: string;
}

const o: Person = {
  name: 'asd',
};

const arr: Array<number> = [1, 2, 3];
