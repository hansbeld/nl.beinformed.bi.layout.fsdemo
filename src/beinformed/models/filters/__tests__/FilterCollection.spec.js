import FilterCollection from "beinformed/models/filters/FilterCollection";
import mockFilters from "./filters.json";
import mockFiltersContributions from "./filtersContributions.json";

describe("Models", () => {
  describe("Filters", () => {
    describe("FilterCollection", () => {
      it("should be able to create an empty collection", () => {
        const collection = new FilterCollection();

        expect(collection instanceof FilterCollection).toBeTruthy();

        expect(collection.all).toEqual([]);
      });

      it("should be able to change filters in the filter collection", () => {
        const collection = new FilterCollection(mockFilters.filter, {
          filter: mockFiltersContributions.filter
        });

        expect(collection.all.length).toBe(6); // eslint-disable-line no-magic-numbers

        expect(collection.getFilterByAttributeKey("STRING")).toBeDefined();
        expect(collection.getFilterByAttributeKey("CHECKBOX")).toBeDefined();
        expect(collection.getFilterByAttributeKey("RADIO")).toBeDefined();
        expect(collection.getFilterByAttributeKey("DATERANGE")).toBeDefined();
        expect(collection.getFilterByAttributeKey("NUMBERRANGE")).toBeDefined();
        expect(collection.getFilterByAttributeKey("ASSIGNMENT")).toBeDefined();

        expect(collection.getFilterByAttributeKey("STRING").type).toBe(
          "string"
        );
        expect(collection.getFilterByAttributeKey("CHECKBOX").type).toBe(
          "choice"
        );
        expect(collection.getFilterByAttributeKey("RADIO").type).toBe("choice");
        expect(collection.getFilterByAttributeKey("DATERANGE").type).toBe(
          "daterange"
        );
        expect(collection.getFilterByAttributeKey("NUMBERRANGE").type).toBe(
          "numberrange"
        );
        expect(collection.getFilterByAttributeKey("USERKEY").type).toBe(
          "assignment"
        );

        expect(collection.getFilterByAttributeKey("STRING").label).toBe(
          "Stringfilter"
        );
        expect(collection.getFilterByAttributeKey("CHECKBOX").label).toBe(
          "Checkboxfilter"
        );
        expect(collection.getFilterByAttributeKey("RADIO").label).toBe(
          "Radiofilter"
        );
        expect(collection.getFilterByAttributeKey("DATERANGE").label).toBe(
          "Date range"
        );
        expect(collection.getFilterByAttributeKey("NUMBERRANGE").label).toBe(
          "Number range"
        );
        expect(collection.getFilterByAttributeKey("USERKEY").label).toBe(
          "Assignments"
        );
      });
    });
  });
});
