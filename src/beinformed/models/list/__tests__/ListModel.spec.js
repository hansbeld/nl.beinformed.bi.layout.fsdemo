import ListHref from "beinformed/models/href/ListHref";
import Href from "beinformed/models/href/Href";
import FilterCollection from "beinformed/models/filters/FilterCollection";

import ListModel from "beinformed/models/list/ListModel";

import mockList from "./list.json";
import mockListContributions from "./listContributions.json";

describe("ListModel spec", () => {
  it("should be able to create an empty list", () => {
    const list = new ListModel();

    expect(list instanceof ListModel).toBeTruthy();

    expect(list.selfhref).toBeUndefined();
    expect(list.key).toBe("unknown");

    expect(list.listItemCollection.all).toEqual([]);
    expect(list.filterCollection instanceof FilterCollection).toBe(true);

    expect(list.listItemCollection.isEmpty).toBe(true);

    expect(list.headers.length).toBe(0);

    expect(list.introtext).toBe("");

    expect(typeof list.createListItem).toBe("function");
  });

  it("should be able to create a list from a typical modular ui response", () => {
    const list = new ListModel({
      request: {
        href: new Href("/Books")
      },
      key: "Books",
      data: mockList.Books,
      contributions: mockListContributions.Books
    });

    expect(list instanceof ListModel).toBeTruthy();

    const selfLink = new ListHref("/books/books", list);

    selfLink.page = 1;
    selfLink.pagesize = 50;

    expect(list.selfhref.href).toEqual(selfLink.href);
    expect(list.key).toBe("Books");

    expect(list.listItemCollection.length).toBe(32); // eslint-disable-line no-magic-numbers

    expect(list.listItemCollection.hasItems).toBe(true);

    expect(list.headers.length).toBe(6); // eslint-disable-line no-magic-numbers

    expect(list.introtext).toEqual(
      "<p>This is a list of <em>books</em><br />For each book the <strong>contributers</strong> and the <strong>publishers</strong> are added as <u>additional details</u>.<br />For more information see amazon</p>"
    );
  });
});
