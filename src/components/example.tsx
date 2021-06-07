import { FC, useEffect, useState } from 'react';

export interface SearcherProps {
  query: string;
}
interface ToDo {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
}

const JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com/todos/1';
export const Searcher1: FC<SearcherProps> = ({ query }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(JSON_PLACEHOLDER + '&query=' + query).then((_data) => setData(_data));
  }, [query]);

  return <div>{data}</div>;
};

export const Searcher: FC<SearcherProps> = ({ query }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(JSON_PLACEHOLDER + '&query=' + query).then((_data) => {
      setData(_data);
      setLoading(false);
    });
  }, [query]);

  return loading ? <div>loading....</div> : <div>{data}</div>;
};

export const Searcher2: FC<SearcherProps> = ({ query }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(JSON_PLACEHOLDER + '&query=' + query)
      .then((_data) => {
        setData(_data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [query]);

  if (error) {
    return <div>Sorry we encoundeted an error.</div>;
  } else {
    return loading ? <div>loading....</div> : <div>{data}</div>;
  }
};
