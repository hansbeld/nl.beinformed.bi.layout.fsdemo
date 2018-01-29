import BaseCollection from "beinformed/models/base/BaseCollection";

describe("BaseCollection", () => {
  it("should be able to create an empty BaseCollection", () => {
    const collection = new BaseCollection();

    expect(collection.hasItems).toBe(false);
    expect(collection.isEmpty).toBe(true);
    expect(collection.first).toBe(null);
    expect(collection.size).toBe(0);
    expect(collection.length).toBe(0);
  });

  it("Can add items", () => {
    const collection = new BaseCollection();

    collection.add(new BaseCollection(["a", "b"]));
    expect(collection.length).toBe(2);
    expect(collection.first).toBe("a");

    collection.add(["c", "d"]);
    expect(collection.length).toBe(4);

    collection.add("e");
    expect(collection.length).toBe(5);

    collection.collection = ["a", "b", "c"];
    expect(collection.length).toBe(3);

    expect(collection.collection).toEqual(["a", "b", "c"]);
  });

  it("can find items", () => {
    const collection = new BaseCollection(["aa", "ab", "ac"]);

    expect(collection.find(item => item.includes("a"))).toBe("aa");
    expect(collection.find(item => item.includes("d"))).toBe(null);
    expect(collection.filter(item => item.includes("a"))).toEqual([
      "aa",
      "ab",
      "ac"
    ]);
  });

  it("can sort", () => {
    const collection = new BaseCollection(["b", "c", "a"]);

    expect(collection.sorted).toEqual(["a", "b", "c"]);
  });
});
