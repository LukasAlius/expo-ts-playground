import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Recipe } from "../../utils/fetchRecipes";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const {
    name,
    shortDescription: shortDesc,
    image,
    chilli,
    cookingTime,
    averageRating,
  } = recipe;
  const flip = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${flip.value}deg` }],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${flip.value - 180}deg` }],
    };
  });

  const flipCard = () => {
    flip.value = withTiming(flip.value === 0 ? 180 : 0);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={flipCard}>
        <Animated.View style={[styles.front, frontStyle]}>
          <Image style={styles.image} source={image} contentFit="cover" />
          <Text style={styles.title}>{name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {shortDesc}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.back, backStyle]}>
          <Text style={styles.bodyText}>⭐️ Rating: {averageRating}</Text>
          <Text style={styles.bodyText}>
            🌶️ Spiciness: {"🌶️".repeat(chilli)}
          </Text>
          <Text style={styles.bodyText}>
            ⏲️ Cooking time: {cookingTime} minutes
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
  },
  front: {
    height: 300,
    width: 300,
    position: "absolute",
  },
  back: {
    height: 300,
    width: 300,
    backfaceVisibility: "hidden",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
  },
  image: {
    flex: 1,
    borderRadius: 8,
    width: "100%",
    height: "100%",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
  },
  bodyText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
});
