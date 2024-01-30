/**
 * Convert tags to list of metafields
 * Convert product tags with a certain prefix into a product metafield of type list.single_line_text_field
*/

export default function main({product}) {
  // Get the existing values in the metafield custom.product_colors
  const colorMetafieldObject = product.metafields.find((metafield) => metafield.namespace === "custom" && metafield.key === "product_colors");
  const colorMetafield = colorMetafieldObject ? JSON.parse(colorMetafieldObject.value) : [];
  const colorPrefix = "color:";

  product.tags.forEach((tag) => {
    //if the tag contains "color:"
    if(tag.includes(colorPrefix)) {
      const color = tag.replace(colorPrefix,"");
      if (!colorMetafield.includes(color)) {
        colorMetafield.push(color);
      }
    }
  });

  //Output a string that can be passed directly to an update metafield action
  return { colorMetafield: JSON.stringify(colorMetafield) };
}
