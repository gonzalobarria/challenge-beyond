export const fetchData = (url: string) => fetch(url).then((res) => res.json());
