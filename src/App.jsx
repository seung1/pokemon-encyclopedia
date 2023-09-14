import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import PokeCard from "./components/PokeCard";
import AutoComplete from "./components/AutoComplete";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const [moreButtonLoading, setMoreButtonLoading] = useState(false);

  const defaultLimit = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  const filterDisplayedPokemonData = (allData, displayedData = []) => {
    const limit = displayedData.length + defaultLimit;

    const array = allData.filter((_, idx) => idx + 1 <= limit);
    return array;
  };

  // 포켓몬 정보 가져오기 => name, url
  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);

      setAllPokemons(response.data.results);

      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
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
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
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
        {allPokemons.length > displayedPokemons.length &&
        displayedPokemons.length !== 1 ? (
          moreButtonLoading ? (
            <div className="flex items-center justify-center my-4">
              ...loading
            </div>
          ) : (
            <button
              disabled={moreButtonLoading}
              onClick={() => {
                setMoreButtonLoading(true);
                setDisplayedPokemons(
                  filterDisplayedPokemonData(allPokemons, displayedPokemons)
                );
                setMoreButtonLoading(false);
              }}
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더 보기
            </button>
          )
        ) : null}
      </div>
    </article>
  );
}

export default App;
