export const mapCategoryToColor = (
  category: Category,
): CategoryColorMap[Category] => {
  switch (category) {
    case "personal":
      return "orange";
    case "home":
      return "green";
    case "business":
      return "purple";
    default:
      return "orange"; // Default to orange if the category type is not recognized
  }
};
