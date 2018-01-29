import Href from "beinformed/models/href/Href";

describe("Href spec", () => {
  it("should create an empty href when not data is set", () => {
    const href = new Href();

    expect(href.getParameter("nonexistedKey")).toBeUndefined();
    expect(href.parameters.length).toBe(0);
    expect(href.querystring).toBe("");
    expect(href.path).toBe("");
    expect(href.href).toBe("");
    expect(href.absolutehref).toBe("/BeInformed");
    expect(href.startsWith("/nonexists")).toBe(false);
  });

  it("should create a href from a typical link href", () => {
    const href = new Href("/casetab/caseview");

    expect(href.getParameter("nonexistedKey")).toBeUndefined();
    expect(href.parameters.length).toBe(0);
    expect(href.querystring).toBe("");
    expect(href.path).toBe("/casetab/caseview");
    expect(href.href).toBe("/casetab/caseview");
    expect(href.absolutehref).toBe("/BeInformed/casetab/caseview");
    expect(href.startsWith(new Href("/casetab"))).toBe(true);
  });

  it("should create a href with querystring from a typical link href", () => {
    const href = new Href("/casetab/caseview?key=value&key2=value2");

    expect(href.getParameter("key").value).toBe("value");
    expect(href.parameters.length).toBe(2);
    expect(href.querystring).toBe("key=value&key2=value2");
    expect(href.path).toBe("/casetab/caseview");
    expect(href.href).toBe("/casetab/caseview?key=value&key2=value2");
    expect(href.absolutehref).toBe(
      "/BeInformed/casetab/caseview?key=value&key2=value2"
    );
    expect(href.startsWith(new Href("/casetab"))).toBe(true);
  });

  it("should be able to change querystring parameters", () => {
    const href = new Href("/casetab/caseview?key=value&key2=value2");

    href.setParameter("key3", "value3");
    expect(href.getParameter("key3").value).toBe("value3");

    expect(href.getParameter("key2").value).toBe("value2");
    href.setParameter("key2", "value2-changed");
    expect(href.getParameter("key2").value).toBe("value2-changed");

    href.removeParameter("key");
    expect(href.getParameter("key")).toBeUndefined();
    expect(href.querystring).toBe("key3=value3&key2=value2-changed");
  });

  it("should be able to return if one href has the same context as the other", () => {
    const mainHref = new Href("/casetab/caseview/1");

    const sameContextHref = new Href("/casetab/caseview/2");
    const otherContextHref = new Href("/casetab/otherCaseview/2");

    expect(mainHref.hasOtherContext(sameContextHref)).toBe(false);
    expect(mainHref.hasOtherContext(otherContextHref)).toBe(true);

    const sameContextCasetab = new Href("/casetab");
    const otherContextCasetab = new Href("/casetab2");

    expect(mainHref.hasOtherContext(sameContextCasetab)).toBe(false);
    expect(mainHref.hasOtherContext(otherContextCasetab)).toBe(true);

    const sameContextDeeperHref = new Href("/casetab/caseview/1/otherPanel");

    expect(mainHref.hasOtherContext(sameContextDeeperHref)).toBe(false);
  });

  it("should be able to server hrefs with spaces", () => {
    const href = new Href(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );

    expect(href.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );

    const href2 = new Href(
      "/concepts/Content/Knowledge%20models/All%20source%20types.bixml/AllKindOfSources"
    );

    expect(href2.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
  });

  it("should be able to create an Href from an Href", () => {
    const href = new Href(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
    const href2 = new Href(href);

    expect(href2.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
  });

  it("can check for equal hrefs with or without parameters", () => {
    const baseHref = new Href("/url?param1=value1");
    const sameHref = new Href("/url?param1=value1");
    const samePathHref = new Href("/url?param1=value2");
    const otherHref = new Href("/path?param1=value1");

    expect(baseHref.equals(sameHref)).toBe(true);
    expect(baseHref.equals(samePathHref)).toBe(true);
    expect(baseHref.equals(otherHref)).toBe(false);

    expect(baseHref.equalsWithParameters(sameHref)).toBe(true);
    expect(baseHref.equalsWithParameters(samePathHref)).toBe(false);
    expect(baseHref.equalsWithParameters(otherHref)).toBe(false);
  });
});
