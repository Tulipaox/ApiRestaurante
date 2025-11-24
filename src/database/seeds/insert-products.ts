import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("products").del();

    await knex("products").insert([
        { name: "sei la", price: 10.2 },
        { name: "to ligado que vcs estao me vendo", price: 10.2 },
        { name: "tao se escodendo por que", price: 10.2 }
    ]);
};
