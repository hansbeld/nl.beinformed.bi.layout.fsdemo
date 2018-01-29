import DetailModel from "beinformed/models/detail/DetailModel";

import Href from "beinformed/models/href/Href";

import mockDetail from "./detail.json";
import mockDetailContributions from "./detailContributions.json";

describe("Models", () => {
  describe("Details", () => {
    describe("DetailModel", () => {
      it("should be able to create an empty detail", () => {
        const detail = new DetailModel({});

        expect(detail instanceof DetailModel).toBeTruthy();
      });

      it("should be able to create a detail from a typical modular UI json structure", () => {
        const detail = new DetailModel({
          request: {
            href: new Href("/books/book/24", "CaseView")
          },
          key: "Book",
          data: mockDetail.Book,
          contributions: mockDetailContributions.Book
        });

        expect(detail instanceof DetailModel).toBeTruthy();

        expect(detail.key).toBe("Book");

        expect(detail.id).toBe(24); // eslint-disable-line no-magic-numbers

        const selfLink = new Href("/books/book/24", "CaseView");

        expect(detail.selfhref).toEqual(selfLink);

        expect(detail.attributeCollection.size).toBe(5); // eslint-disable-line no-magic-numbers
      });
    });
  });
});
