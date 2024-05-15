import { useQuery } from "@tanstack/react-query";


export async function getFilms() {
  console.log("ENTRA ACA");
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  const dataMap = data.results.map((film: Film) => ({
    ...film,
  }));

  return data.results;
}
export async function getFilm(id: string) {
  try {
    const response = await fetch(id);
    const data = await response.json();
    // Mapear las URLs de los personajes a promesas de solicitudes de red y esperar todas las solicitudes usando Promise.all()
    const characterPromises = data.characters.map(
      async (characterUrl: string) => {
        const characterResponse = await fetch(characterUrl);
        return characterResponse.json();
      }
    );

    // Esperar todas las promesas de personajes y mapear los resultados a los datos de personajes
    const charactersData = await Promise.all(characterPromises);

    // Construir la película con los datos de personajes mapeados
    const film: Film = {
      title: data.title,
      episode_id: data.episode_id,
      director: data.director,
      characters: charactersData.map((character: any) => character),
      url: data.url,
    };
    console.log("FILM? ", film);

    return film;
  } catch (error) {
    console.log("ERROR: ", error);
  }
}
export const useFilms = (id: string | null | undefined) => {
  const queryKey = ["films", id];
  const queryFn = id ? () => getFilm(id) : getFilms;
  
  const query = useQuery({
    queryKey,
    queryFn,
  });

  return query;
};