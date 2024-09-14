// https://vike.dev/data
import type { PageContextServer } from "vike/types";

export type Data = {
  todo: { text: string }[];
};

export default async function data(_pageContext: PageContextServer): Promise<Data> {
  return {
    todo: [
      { text: 'Buy milk' },
      { text: 'Buy eggs' },
      { text: 'Buy bread' },
    ],
  };
}
