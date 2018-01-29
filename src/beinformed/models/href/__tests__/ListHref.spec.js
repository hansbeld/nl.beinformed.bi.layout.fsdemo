import Href from "beinformed/models/href/Href";
import ListHref from "beinformed/models/href/ListHref";
import ListModel from "beinformed/models/list/ListModel";

import mockList from "./list.json";
import mockListContributions from "./listContributions.json";

describe("ListHref", () => {
  let list;

  beforeEach(() => {
    list = new ListModel({
      request: {
        href: new Href("/Books")
      },
      key: "Books",
      data: mockList.Books,
      contributions: mockListContributions.Books
    });
  });

  it("should create an empty ListHref when no data is set", () => {
    const href = new ListHref();

    expect(href instanceof ListHref).toBeTruthy();
  });

  it("should be able to change paging parameters", () => {
    const href = new ListHref(list.selfhref, list);

    expect(href.querystring).toBe("page=1&pagesize=50");

    href.page = 2;
    expect(href.querystring).toBe("pagesize=50&page=2");

    href.pagesize = 10;
    expect(href.querystring).toBe("page=2&pagesize=10");
  });

  it("should be able to change sorting parameters", () => {
    const href = new ListHref(list.selfhref, list);

    expect(href.querystring).toBe("page=1&pagesize=50");

    href.sort = "ID desc";
    expect(href.querystring).toBe("page=1&pagesize=50&sort=ID desc");
  });
});
