import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();
  const pokemonId = params.id;

  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

  const getNextAndPreviousPokemon = async (id) => {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));
    const previousResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));

    return {
      next: nextResponse?.data?.results?.[0].name,
      previous: previousResponse?.data?.results?.[0].name,
    };
  };

  const fetchPokemonData = async () => {
    const url = `${baseUrl}${pokemonId}`;
    try {
      const { data: pokemonData } = await axios.get(url);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } =
          pokemonData;

        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);

        // 진행중
        console.log(nextAndPreviousPokemon);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return <div>DetailPage</div>;
};

export default DetailPage;
