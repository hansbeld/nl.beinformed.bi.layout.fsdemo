import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

describe("PasswordAttributeModel", () => {
  it("should be able to create an empty PasswordAttribute object", () => {
    const attribute = new PasswordAttributeModel();

    expect(attribute instanceof PasswordAttributeModel).toBe(true);
    expect(attribute.type).toBe("password");
  });

  it("can handle password constraints", () => {
    const attributeJSON = {
      key: "Password",
      value: ""
    };
    const attributeContribution = {
      type: "string",
      label: "Password",
      mandatory: false,
      layouthint: ["password"],
      constraints: {
        upperAndLowerCaseMandatory: true,
        minNumberOfNumericCharacters: 1,
        minNumberOfSpecialCharacters: 1,
        maxSequenceOfIdenticalCharacters: 2,
        maxSequenceOfUsernameCharacters: 4,
        regexConstraint: [
          {
            regex: "^((?!test).)*$",
            messageKey: "Password_regex_validation"
          }
        ]
      },
      displaysize: 50,
      maxLength: 50,
      minLength: 6
    };

    const attribute = new PasswordAttributeModel(
      attributeJSON,
      attributeContribution
    );

    expect(attribute instanceof PasswordAttributeModel).toBe(true);
    expect(attribute.type).toBe("password");

    expect(attribute.hasNoSequenceOfIdenticalCharacters("ABACDEFGH")).toBe(
      true
    );
    expect(
      attribute.hasNoSequenceOfIdenticalCharacters("ABAAABBCCDDEEFFGGHHAA")
    ).toBe(false);
    expect(attribute.hasNoSequenceOfIdenticalCharacters("")).toBe(true);

    expect(attribute.hasUpperAndLowerCharacters("aB")).toBe(true);
    expect(attribute.hasUpperAndLowerCharacters("")).toBe(false);
    expect(attribute.hasUpperAndLowerCharacters("a")).toBe(false);
    expect(attribute.hasUpperAndLowerCharacters("B")).toBe(false);
    expect(attribute.hasUpperAndLowerCharacters("1")).toBe(false);

    expect(attribute.hasMinNumberOfNumbericCharacters("ABCD12345")).toBe(true);
    expect(attribute.hasMinNumberOfNumbericCharacters("ABCD")).toBe(false);

    expect(attribute.hasMinNumberOfSpecialCharacters("Ab&")).toBe(true);
    expect(attribute.hasMinNumberOfSpecialCharacters("Ab")).toBe(false);
  });
});
