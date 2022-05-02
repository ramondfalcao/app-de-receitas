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

export async function requestAllMeals() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestCategoryMeals() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}

export async function requestFilterMeals(name) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
  );
  const result = await response.json();
  return response.ok
    ? Promise.resolve(result)
    : Promise.reject(result);
}
