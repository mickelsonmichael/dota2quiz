import { items } from "./items.json";
import fs from "fs";

test("items with no components have no recipe", () => {
  items
    .filter((i) => i.components.length === 0)
    .forEach((i) => expect(i.recipe).toBe(false));
});

test("item components match an id", () => {
  let ids = items.map((i) => i.id);
  ids.sort();

  items
    .filter((i) => i.components.length > 0)
    .map((i) => i.components)
    .reduce((a, b) => a.concat(b), [])
    .forEach((id) => expect(ids).toContain(id));
});

test("items have matching images", () => {
  const files = fs.readdirSync("public/images");

  items.map((i) => i.file).forEach((f) => expect(files).toContain(f));
});

test("items have non-negative costs", () => {
  items.forEach((i) => expect(i.cost).toBeGreaterThanOrEqual(0));
});
