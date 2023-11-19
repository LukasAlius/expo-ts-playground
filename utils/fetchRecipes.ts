export type Recipe = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  chilli: number;
  cookingTime: string;
  averageRating: string;
  allergens: string[];
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch("https://simplycook.com/api/recipes");
  return res.json();
};
