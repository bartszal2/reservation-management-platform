export const shortenedTextFormat = (value: string | null, count: number = 15): string | null => {
  if (value) {
    const words: string[] = value.split(" ");

    if (words.length <= count) {
      return value;
    } else {
      let newText: string[] = [];

      for (let i = 0; i < count; i++) {
        newText.push(words[i]);
      }

      const result: string = `${newText.join(" ")}...`;
      return result;
    }
  } else {
    return null;
  }
};
