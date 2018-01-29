import CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import DetailModel from "beinformed/models/detail/DetailModel";

describe("CaseViewModel", () => {
  it("should be able to create an empty casedetail", () => {
    const caseview = new CaseViewModel({});

    expect(caseview instanceof CaseViewModel).toBeTruthy();
  });

  it("should be able to create a casedetail from a typical modular UI json structure", () => {
    const caseDetail = new CaseViewModel({
      key: "Book",
      data: {
        _links: {
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
        },
        _id: 24,
        CaseName: "The safety of objects",
        CaseType: "Book",
        Owner: "Arnold",
        Format: "Paperback",
        ISBN10: "1847087302",
        ISBN13: "9781847087300",
        Language: "EN",
        NumberOfPages: 176,
        State: "Registered"
      },
      contributions: {
        label: "Book",
        resourcetype: "CaseView",
        texts: [
          {
            type: "master",
            text:
              "<p>This view contains all the data about this book. It contains a list of the creators and editions. A person can be an author(1) or an illustrator(2)<br /><br />This is a list of books that is ordered by the role (author (1), co-author, illustrator(2)) of the person that contributed to the book.<br /><br />1) An author is broadly defined as &quot;the person who originated or gave existence to anything&quot; and whose authorship determines responsibility for what was created. Narrowly defined, an author is the originator of any written work and can also be described as a writer.<br /><br />2) An illustrator is an artist who specializes in enhancing writing or elucidating concepts by providing a visual representation that corresponds to the content of the associated text or idea. The illustration may be intended to clarify complicated concepts or objects that are difficult to describe textually, which is the reason illustrations are often found in children&#39;s books.<br /></p>"
          }
        ],
        _links: {
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
        },
        metadata: {
          _id: {
            label: "Id",
            type: "integer"
          },
          CaseName: {
            label: "Case name",
            type: "string"
          },
          CaseType: {
            label: "Case type",
            type: "string"
          },
          Owner: {
            label: "Case owner",
            type: "string"
          },
          State: {
            label: "State",
            type: "string",
            options: [
              {
                code: "Registered",
                label: "Registered"
              }
            ]
          }
        },
        attributes: [
          {
            Format: {
              label: "Format",
              type: "string",
              multiplechoice: false,
              layouthint: ["combobox"],
              options: [
                {
                  code: "Hardcover",
                  label: "Hardcover"
                },
                {
                  code: "Paperback",
                  label: "Paperback"
                },
                {
                  code: "Ebook",
                  label: "Ebook"
                },
                {
                  code: "Audio",
                  label: "Audio book"
                }
              ]
            }
          },
          {
            ISBN10: {
              label: "ISBN10",
              type: "string",
              displaysize: 50
            }
          },
          {
            ISBN13: {
              label: "ISBN13",
              type: "string",
              displaysize: 50
            }
          },
          {
            Language: {
              label: "Language",
              type: "string",
              multiplechoice: false,
              layouthint: ["radiobutton"],
              options: [
                {
                  code: "EN",
                  label: "English"
                },
                {
                  code: "DU",
                  label: "Dutch"
                }
              ]
            }
          },
          {
            NumberOfPages: {
              label: "Number of pages",
              type: "number",
              format: "0",
              groupingSeparator: ".",
              decimalSeparator: ",",
              minimum: 1,
              maximum: 1000
            }
          }
        ]
      }
    });

    expect(caseDetail instanceof CaseViewModel).toBeTruthy();
    expect(caseDetail instanceof DetailModel).toBeTruthy();

    expect(caseDetail.key).toBe("Book");
    expect(caseDetail.id).toBe(24); // eslint-disable-line no-magic-numbers

    expect(caseDetail.casename.value).toBe("The safety of objects");
    expect(caseDetail.owner.value).toBe("Arnold");
    expect(caseDetail.status.value).toBe("Registered");
    expect(caseDetail.casetype.value).toBe("Book");
  });
});
