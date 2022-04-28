export async function requestDrinksIngredient(ingredient) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestDrinksName(name) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestDrinksFirstLetter(firstLetter) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
}
