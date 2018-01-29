// eslint-disable no-magic-numbers
import LinkCollection from "beinformed/models/links/LinkCollection";
import LinkModel from "beinformed/models/links/LinkModel";

describe("LinkCollection spec", () => {
  it("should create links with labels when service description available", () => {
    const data = {
      self: {
        href: "/"
      },
      api_doc: {
        href: "/api-docs/"
      },
      contributions: {
        href: "/contributions/"
      },
      tab: [
        {
          href: "/books",
          name: "Books"
        },
        {
          href: "/persons",
          name: "Persons"
        },
        {
          href: "/publishinghouses",
          name: "PublishingHouses"
        },
        {
          href: "/UT_books",
          name: "UT_Books"
        },
        {
          href: "/UT_persons",
          name: "UT_Persons"
        },
        {
          href: "/UT_publishinghouses",
          name: "UT_PublishingHouses"
        },
        {
          href: "/UT_bookPrints",
          name: "UTBookPrints"
        },
        {
          href: "/RebuildDB",
          name: "RebuildDB"
        }
      ],
      login: {
        href: "/login"
      }
    };

    const contributions = {
      tab: [
        {
          name: "Books",
          label: "Books",
          resourcetype: "CaseTab"
        },
        {
          name: "Persons",
          label: "Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "PublishingHouses",
          label: "Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Books",
          label: "UT_Books",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Persons",
          label: "UT_Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_PublishingHouses",
          label: "UT_Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UTBookPrints",
          label: "UT Book prints",
          resourcetype: "GenericTab"
        },
        {
          name: "UsersAndOrganizations",
          label: "Users and organizations",
          resourcetype: "GenericTab"
        },
        {
          name: "RebuildDB",
          label: "Rebuild DB",
          resourcetype: "CaseTab"
        }
      ],
      login: {
        label: "Login",
        resourcetype: "login_panel"
      }
    };

    const links = new LinkCollection(data, contributions);

    expect(links instanceof LinkCollection).toBeTruthy();
    expect(links.getLinksByGroup("tab").size).toBe(8);
  });

  it("should create a link collection from caseview links", () => {
    const data = {
      self: {
        href: "/books/book/24"
      },
      api_doc: {
        href: "/api-docs/books/book/24"
      },
      contributions: {
        href: "/contributions/books/book/24"
      },
      Creator: {
        href: "/books/book/24/creator"
      },
      Editions: {
        href: "/books/book/24/editions"
      },
      Activities: {
        href: "/books/book/24/activities"
      },
      taskgroup: [
        {
          href: "/books/book/24/Tasks",
          name: "Tasks"
        }
      ]
    };

    const contributions = {
      panel: [
        {
          name: "Creator",
          label: "Creator",
          resourcetype: "CaseRelationListPanel"
        },
        {
          name: "Editions",
          label: "Editions",
          resourcetype: "RecordListPanel"
        },
        {
          name: "Activities",
          label: "Activities",
          resourcetype: "GroupingPanel"
        }
      ],
      taskgroup: [
        {
          name: "Tasks",
          label: "Tasks",
          resourcetype: "TaskGroup"
        }
      ]
    };

    const links = new LinkCollection(data, contributions);

    expect(links.getLinksByGroup("panel").size).toBe(3);
  });

  it("should create a link collection from attribute download links", () => {
    const data = {
      download: [
        {
          href: "/files/77?location=Location&filename=Filename",
          name: "Download"
        },
        {
          href: "/files/77?location=Location&filename=Filename",
          name: "Download"
        }
      ]
    };

    const links = new LinkCollection(data);

    expect(links.size).toBe(2);
  });

  it("can update an existing link in a collection", () => {
    const data = {
      self: {
        href: "/"
      },
      api_doc: {
        href: "/api-docs/"
      },
      contributions: {
        href: "/contributions/"
      },
      tab: [
        {
          href: "/books",
          name: "Books"
        },
        {
          href: "/persons",
          name: "Persons"
        },
        {
          href: "/publishinghouses",
          name: "PublishingHouses"
        },
        {
          href: "/UT_books",
          name: "UT_Books"
        },
        {
          href: "/UT_persons",
          name: "UT_Persons"
        },
        {
          href: "/UT_publishinghouses",
          name: "UT_PublishingHouses"
        },
        {
          href: "/UT_bookPrints",
          name: "UTBookPrints"
        },
        {
          href: "/RebuildDB",
          name: "RebuildDB"
        }
      ],
      login: {
        href: "/login"
      }
    };

    const contributions = {
      tab: [
        {
          name: "Books",
          label: "Books",
          resourcetype: "CaseTab"
        },
        {
          name: "Persons",
          label: "Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "PublishingHouses",
          label: "Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Books",
          label: "UT_Books",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Persons",
          label: "UT_Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_PublishingHouses",
          label: "UT_Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UTBookPrints",
          label: "UT Book prints",
          resourcetype: "GenericTab"
        },
        {
          name: "UsersAndOrganizations",
          label: "Users and organizations",
          resourcetype: "GenericTab"
        },
        {
          name: "RebuildDB",
          label: "Rebuild DB",
          resourcetype: "CaseTab"
        }
      ],
      login: {
        label: "Login",
        resourcetype: "login_panel"
      }
    };

    const links = new LinkCollection(data, contributions);

    const newLink = new LinkModel({
      name: "self",
      href: "/newhref"
    });
    const newLinks = links.update(newLink);

    expect(newLinks.getLinkByKey("self").href.href).toBe("/newhref");
  });

  it("can udd a non-existing link in a collection", () => {
    const data = {
      self: {
        href: "/"
      },
      api_doc: {
        href: "/api-docs/"
      },
      contributions: {
        href: "/contributions/"
      },
      tab: [
        {
          href: "/books",
          name: "Books"
        },
        {
          href: "/persons",
          name: "Persons"
        },
        {
          href: "/publishinghouses",
          name: "PublishingHouses"
        },
        {
          href: "/UT_books",
          name: "UT_Books"
        },
        {
          href: "/UT_persons",
          name: "UT_Persons"
        },
        {
          href: "/UT_publishinghouses",
          name: "UT_PublishingHouses"
        },
        {
          href: "/UT_bookPrints",
          name: "UTBookPrints"
        },
        {
          href: "/RebuildDB",
          name: "RebuildDB"
        }
      ],
      login: {
        href: "/login"
      }
    };

    const contributions = {
      tab: [
        {
          name: "Books",
          label: "Books",
          resourcetype: "CaseTab"
        },
        {
          name: "Persons",
          label: "Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "PublishingHouses",
          label: "Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Books",
          label: "UT_Books",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_Persons",
          label: "UT_Persons",
          resourcetype: "CaseTab"
        },
        {
          name: "UT_PublishingHouses",
          label: "UT_Publishing houses",
          resourcetype: "CaseTab"
        },
        {
          name: "UTBookPrints",
          label: "UT Book prints",
          resourcetype: "GenericTab"
        },
        {
          name: "UsersAndOrganizations",
          label: "Users and organizations",
          resourcetype: "GenericTab"
        },
        {
          name: "RebuildDB",
          label: "Rebuild DB",
          resourcetype: "CaseTab"
        }
      ],
      login: {
        label: "Login",
        resourcetype: "login_panel"
      }
    };

    const links = new LinkCollection(data, contributions);

    expect(links.size).toBe(12);

    const nonExistingLink = new LinkModel({
      name: "not-existing",
      href: "/is-added"
    });
    const newLinks = links.update(nonExistingLink);

    expect(links.size).toBe(13);
    expect(newLinks.getLinkByKey("not-existing").href.href).toBe("/is-added");
  });
});
