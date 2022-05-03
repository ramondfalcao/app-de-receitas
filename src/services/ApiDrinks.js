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

export async function requestAllDrinks() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestCategoryDrinks() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestFilterDrinks(name) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`,
  );
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestDrinkId(id) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
}
