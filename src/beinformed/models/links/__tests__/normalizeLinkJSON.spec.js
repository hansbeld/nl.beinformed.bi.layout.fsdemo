import normalizeLinkJSON from "beinformed/models/links/normalizeLinkJSON";

describe("normalizeLinkJSON spec", () => {
  it("should return empty array when no data and contributions are provided", () => {
    const output = normalizeLinkJSON();

    expect(output.length).toBe(0);
  });

  it("should create an array of link json from webapp links", () => {
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

    const output = normalizeLinkJSON(data, contributions);

    expect(output.length).toBe(12); // eslint-disable-line no-magic-numbers
  });

  it("should create an array of link json from caseview links", () => {
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

    const output = normalizeLinkJSON(data, contributions);

    expect(output.length).toBe(7); // eslint-disable-line no-magic-numbers
  });

  it("should create an array of link json from download links", () => {
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

    const output = normalizeLinkJSON(data);

    expect(output.length).toBe(2);
  });

  it("should  create an array of link json where a link exists in the contributions and not in the data", () => {
    const data = {};

    const contributions = {
      concept: {
        href:
          "/concepts/Testapplicatie_Classificatieinstrument/Kennismodellen/05 Interactie/Interactie.bixml/DummyVraagCollectieReferentieElement"
      }
    };

    const output = normalizeLinkJSON(data, contributions);

    expect(output.length).toBe(1);
  });
});
