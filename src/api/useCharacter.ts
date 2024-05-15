import { useQuery } from "@tanstack/react-query";

export async function getCharacters(page: number | undefined | null) {
  try {
    let pages=page
    const response = await fetch("https://swapi.dev/api/people");
    const data = await response.json();

    // Mapear los datos de la respuesta a objetos de tipo Character
    const characters: Character[] = data.results.map((result: any) => ({
      name: result.name,
      eye_color: result.eye_color,
      birth_year: result.birth_year,
      hair_color: result.hair_color,
      height: Number(result.height), // Convertir a número
      skin_color: result.skin_color,
      mass: result.mass,
      url: result.url
    }));

    return characters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw new Error("Failed to fetch characters");
  }
}
export async function getCharacter(id: string) {
  
  const response = await fetch(id);
  const data = await response.json();
  return data;
}
export const useCharacter = (id: string | null | undefined, page: number | null | undefined) => {
  const queryKey = ['characters', id];
  const queryFn = id ? () => getCharacter(id) : () => getCharacters(page); // Llama a la función correspondiente según los parámetros

  const query = useQuery({
    queryKey,
    queryFn,
  });

  return query;
};