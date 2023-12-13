export const mapCategoryToColor = (
  category: Category,
): CategoryColorMap[Category] => {
  switch (category) {
    case "personal":
      return "bg-orange-400 text-orange-900";
    case "home":
      return "bg-green-400 text-green-900";
    case "business":
      return "bg-purple-400 text-purple-900";
  }
};
