const getProductImagesByCode = (code) => {
  const images = import.meta.glob("/src/images/product/*", { eager: true });
  const imagesProps = Object.values(images).map((image) => image.default);
  const imagesFiltered = imagesProps.filter((image) => image.src.includes(code));

  return imagesFiltered;
}

export default getProductImagesByCode;
