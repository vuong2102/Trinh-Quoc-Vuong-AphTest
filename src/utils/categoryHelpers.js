export function collectCategoryIds(category) {
  if (!category) return [];
  const ids = [category.id];
  if (category.children?.length) {
    category.children.forEach((child) => {
      ids.push(...collectCategoryIds(child));
    });
  }
  return ids;
}

export function mergeFilterLists(tree) {
  let mergedList = [...(tree.filterList || [])];
  if (tree.children?.length) {
    tree.children.forEach((child) => {
      mergedList = mergedList.concat(mergeFilterLists(child));
    });
  }
  return mergedList;
}
