import { useEffect, useState } from "react";
import axios from "axios";

import LazyImage from "./LazyImage";

const PokeCard = ({ url, name }) => {
  const [pokemon, setPokemon] = useState();

  // 세부 정보 가져오기
  const fetchPokeDetailData = async () => {
    try {
      const response = await axios(url);
      setPokemon(formatPokemonData(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // 주어진 정보중에서 필요한것만 가공
  const formatPokemonData = (unformatData) => {
    const { id, types, name } = unformatData;
    const PokeData = { id, name, type: types[0].type.name };

    return PokeData;
  };

  useEffect(() => {
    fetchPokeDetailData();
  }, [url, name]);

  const bg = `bg-${pokemon?.type}`;
  const border = `border-${pokemon?.type}`;
  const text = `text-${pokemon?.type}`;

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <>
      {pokemon && (
        <a
          href={`/pokemon-encyclopedia/${name}`}
          className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center\
          hover:translate-y-[-8px] hover:transition hover:shadow-md\
          active:scale-90`}
        >
          <div
            className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={`w-full f-6 items-center justify-center`}>
            <div
              className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}
            >
              <LazyImage url={img} alt={name} />
            </div>
          </div>
          <div
            className={`${bg} text-xs text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium pt-1`}
          >
            {pokemon.name}
          </div>
        </a>
      )}
    </>
  );
};

export default PokeCard;
