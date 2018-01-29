import {
  DateUtil,
  TimeUtil,
  TimestampUtil,
  ISO_DATE_FORMAT,
  ISO_TIME_FORMAT,
  ISO_TIMESTAMP_FORMAT
} from "beinformed/utils/datetime/DateTimeUtil";

describe("DateTime", () => {
  test("Should convert java date time format to moment date time format", () => {
    expect(DateUtil.convertFormat()).toBe(ISO_DATE_FORMAT);
    expect(TimeUtil.convertFormat()).toBe(ISO_TIME_FORMAT);
    expect(TimestampUtil.convertFormat()).toBe(ISO_TIMESTAMP_FORMAT);

    expect(DateUtil.convertFormat("yyyy-MM-dd")).toBe("YYYY-MM-DD");
    expect(TimeUtil.convertFormat("HH:mm:ss")).toBe("HH:mm:ss");
    expect(TimestampUtil.convertFormat("yyyy-MM-dd HH:mm:ss")).toBe(
      "YYYY-MM-DD HH:mm:ss"
    );
  });

  test("Should render iso date to specified format", () => {
    expect(DateUtil.toFormat("2017-06-13", "DD-MM-YYYY")).toBe("13-06-2017");
    expect(DateUtil.toFormat("2017-06-13", "MM-DD-YYYY")).toBe("06-13-2017");
  });

  test("Should render specified format to iso date", () => {
    expect(DateUtil.toISO("13-06-2017", "DD-MM-YYYY")).toBe("2017-06-13");
    expect(DateUtil.toISO("06-13-2017", "MM-DD-YYYY")).toBe("2017-06-13");
  });

  test("Should render iso time to specified format", () => {
    expect(TimeUtil.toFormat("14:15:12", "HH:mm")).toBe("14:15");
    expect(TimeUtil.toFormat("14:15:12", "h:mm")).toBe("2:15");
    expect(TimeUtil.toFormat("23:15:12", "h:mm")).toBe("11:15");
  });

  test("Should render specified format to iso time", () => {
    expect(TimeUtil.toISO("14:15", "HH:mm")).toBe("14:15:00");
    expect(TimeUtil.toISO("2:15", "h:mm")).toBe("02:15:00");
    expect(TimeUtil.toISO("11:15", "h:mm")).toBe("11:15:00");
  });

  test("Should render iso timestamp to specified format", () => {
    expect(
      TimestampUtil.toFormat("2017-06-13T14:15:12.000Z", "DD-MM-YYYY HH:mm")
    ).toBe("13-06-2017 14:15");
    expect(TimestampUtil.toFormat("2017-06-13T14:15:12", "h:mm")).toBe("2:15");
    expect(TimestampUtil.toFormat("2017-06-13T23:15:12", "DD-MM-YYYY")).toBe(
      "13-06-2017"
    );
  });

  test("Should render specified format to iso timestamp", () => {
    expect(TimestampUtil.toISO("13-06-2017 14:15", "DD-MM-YYYY HH:mm")).toBe(
      "2017-06-13T14:15:00.000"
    );
    expect(TimestampUtil.toISO("13-06-2017 2:15", "DD-MM-YYYY h:mm")).toBe(
      "2017-06-13T02:15:00.000"
    );
    expect(TimestampUtil.toISO("13-06-2017", "DD-MM-YYYY")).toBe(
      "2017-06-13T00:00:00.000"
    );
  });

  test("Should return invalid date when date entered is not a date", () => {
    expect(DateUtil.toISO("bla", "DD-MM-YYYY")).toBe("Invalid date");
    expect(TimeUtil.toISO("bla", "HH:mm")).toBe("Invalid date");
    expect(TimestampUtil.toISO("bla", "DD-MM-YYYY HH:mm")).toBe("Invalid date");
  });
});
