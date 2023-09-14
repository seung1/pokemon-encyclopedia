import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import PokeCard from "./components/PokeCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [moreButtonLoading, setMoreButtonLoading] = useState(false);

  const limit = 20;

  // 포켓몬 정보 가져오기 => name, url
  const fetchPokeData = async () => {
    try {
      const nextOffsetValue = offset + limit;

      setMoreButtonLoading(true);
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}?&offset=${offset}`;
      const response = await axios.get(url);
      setPokemons([...pokemons, ...response.data.results]);
      setMoreButtonLoading(false);

      setOffset(nextOffsetValue);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokeData();
  }, []);

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        input form
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => (
              <PokeCard key={index} url={url} name={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {moreButtonLoading ? (
          <div className="flex items-center justify-center my-4">
            ...loading
          </div>
        ) : (
          <button
            disabled={moreButtonLoading}
            onClick={() => fetchPokeData()}
            className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
          >
            더 보기
          </button>
        )}
      </div>
    </article>
  );
}

export default App;
