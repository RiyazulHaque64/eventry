import { getPlaiceholder } from "plaiceholder";

export const getBlurData = async (imageSrc: string) => {
  const buffer = await fetch(imageSrc).then(async (res) => {
    const result = Buffer.from(await res.arrayBuffer());
    return result;
  });
  const data = await getPlaiceholder(buffer);

  return data;
};
