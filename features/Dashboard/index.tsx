import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";

import { Carousel } from "../../components/index";
import { fetchRecipes } from "../../utils/fetchRecipes";

export const DashboardScreen = () => {
  const { isLoading, error, data } = useQuery("recipes", fetchRecipes);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading stuff</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <Text>Oops something went wrong</Text>
      </View>
    );
  }

  const filteredData = data.filter(
    (r) =>
      r.allergens.includes("Fish") ||
      r.allergens.includes("Crustaceans") ||
      r.allergens.includes("Eggs"),
  );

  return (
    <View style={styles.container}>
      <Carousel data={filteredData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
