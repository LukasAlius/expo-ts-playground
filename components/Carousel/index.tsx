import { FlashList } from "@shopify/flash-list";
import React from "react";

import { Recipe } from "../../utils/fetchRecipes";
import { RecipeCard } from "../RecipeCard/index";

type CarouselProps = {
  data: Recipe[];
};

export const Carousel = ({ data }: CarouselProps) => {
  return (
    <FlashList
      data={data}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => <RecipeCard key={item.id} recipe={item} />}
      estimatedItemSize={100}
      horizontal
    />
  );
};
