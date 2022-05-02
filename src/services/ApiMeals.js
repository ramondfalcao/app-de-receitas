export async function requestMealsIngredient(ingredient) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestMealsName(name) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestMealsFirstLetter(firstLetter) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
}

export async function requestMealId(id) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
}
