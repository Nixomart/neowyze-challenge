import { useQuery } from "@tanstack/react-query";

export async function getCharacters(page: number | undefined | null) {
  try {
    console.log("PAGINA EM GETCHARACTER: ", page);
    
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();
    return  data;
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