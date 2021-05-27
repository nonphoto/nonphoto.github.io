import images from "/data/images/";

export async function prerender() {
  return images.map(({ id }) => ({
    url: `/image/${id}`,
  }));
}
