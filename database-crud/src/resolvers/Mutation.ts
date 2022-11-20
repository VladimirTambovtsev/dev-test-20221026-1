/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Context } from "../Context";
import { Item } from "../entities/Item";
import type { Resolvers } from "../schema/types";

export const Mutation: Resolvers<Context>["Mutation"] = {
  addItem: async (_, { item }, { entityManager }) => {
    const saved = await entityManager.insert(Item, {
      ...item,
      created: Math.round(new Date().getTime() / 1000),
      updated: Math.round(new Date().getTime() / 1000),
    });
    const res = await entityManager.findOneBy(Item, { id: saved.generatedMaps[0].id as number });
    return res as Item;
  },
  updateItem: async (_, { id, item }, { entityManager }) => {
    await entityManager.update(Item, { id }, { ...item, updated: Math.round(new Date().getTime() / 1000) });
    const res = await entityManager.findOneBy(Item, { id });
    return res as Item;
  },
  deleteItem: async (_, { id }, { entityManager }) => {
    await entityManager.delete(Item, { id });
    return true;
  },
};
