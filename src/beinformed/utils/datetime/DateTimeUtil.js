// @flow
import moment from "moment";

import javaToMomentFormat from "beinformed/utils/datetime/javaToMomentFormat";

export const ISO_DATE_FORMAT = "YYYY-MM-DD";
export const ISO_TIME_FORMAT = "HH:mm:ss";
export const ISO_TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS";

class DateTimeUtil {
  _isoFormat: string;

  constructor(isoFormat: string) {
    this._isoFormat = isoFormat;
  }

  now() {
    return moment().format(this._isoFormat);
  }

  toFormat(date: string, targetFormat: string) {
    return moment(date, this._isoFormat).format(targetFormat);
  }

  toISO(date: string, sourceFormat: string) {
    return moment(date, sourceFormat).format(this._isoFormat);
  }

  convertFormat(format: string) {
    return format ? javaToMomentFormat(format) : this._isoFormat;
  }

  /**
   * VALIDATION
   */
  hasFormat(date: string, format: string) {
    return (
      moment(date, format).isValid() &&
      moment(date, format)
        .format(format)
        .replace(/0/g, "") === date.replace(/0/g, "")
    );
  }

  isValid(date: string, inputFormat?: string = this._isoFormat) {
    const MUST_BE_EXACT_FORMAT = true;
    return moment(date, inputFormat, "", MUST_BE_EXACT_FORMAT).isValid();
  }

  // eslint-disable-next-line max-params
  isAfter(
    inputDate: string,
    afterISODate: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ) {
    return (
      typeof afterISODate !== "undefined" &&
      moment(inputDate, inputFormat).isAfter(afterISODate, precision)
    );
  }

  // eslint-disable-next-line max-params
  isSameOrAfter(
    inputDate: string,
    afterISODate: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ) {
    return (
      typeof afterISODate !== "undefined" &&
      moment(inputDate, inputFormat).isSameOrAfter(afterISODate, precision)
    );
  }

  // eslint-disable-next-line max-params
  isBefore(
    inputDate: string,
    beforeISODate: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ) {
    return (
      typeof beforeISODate !== "undefined" &&
      moment(inputDate, inputFormat).isBefore(beforeISODate, precision)
    );
  }

  // eslint-disable-next-line max-params
  isSameOrBefore(
    inputDate: string,
    beforeISODate?: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ): boolean {
    return (
      typeof beforeISODate !== "undefined" &&
      moment(inputDate, inputFormat).isSameOrBefore(beforeISODate, precision)
    );
  }

  // eslint-disable-next-line max-params
  isSame(
    inputDate: string,
    compareDate: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ) {
    return moment(inputDate, inputFormat).isSame(compareDate, precision);
  }

  // eslint-disable-next-line max-params
  isOther(
    inputDate: string,
    compareDate: string,
    inputFormat?: string = this._isoFormat,
    precision?: string
  ) {
    return !this.isSame(inputDate, compareDate, inputFormat, precision);
  }

  isWeekend(inputDate: string) {
    const SATURDAY_NUMBER = 6;
    const SUNDAY_NUMBER = 7;
    const isoWeekDay = moment(inputDate, this._isoFormat).isoWeekday();

    return isoWeekDay === SATURDAY_NUMBER || isoWeekDay === SUNDAY_NUMBER;
  }

  /**
   * CALCULATIONS
   */
  addSeconds(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "seconds")
      .format(this._isoFormat);
  }

  addMinutes(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "minutes")
      .format(this._isoFormat);
  }

  addHours(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "hours")
      .format(this._isoFormat);
  }

  addDays(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "days")
      .format(this._isoFormat);
  }

  addWeeks(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "weeks")
      .format(this._isoFormat);
  }

  addMonths(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "months")
      .format(this._isoFormat);
  }

  addYears(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .add(amount, "years")
      .format(this._isoFormat);
  }

  subtractSeconds(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "seconds")
      .format(this._isoFormat);
  }

  subtractMinutes(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "minutes")
      .format(this._isoFormat);
  }

  subtractHours(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "hours")
      .format(this._isoFormat);
  }

  subtractDays(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "days")
      .format(this._isoFormat);
  }

  subtractWeeks(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "weeks")
      .format(this._isoFormat);
  }

  subtractMonths(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "months")
      .format(this._isoFormat);
  }

  subtractYears(date: string, amount: number) {
    return moment(date, this._isoFormat)
      .subtract(amount, "years")
      .format(this._isoFormat);
  }

  /**
   * GETTERS
   */
  startOfMonth(date: string) {
    return moment(date, this._isoFormat)
      .startOf("month")
      .format(this._isoFormat);
  }

  startOfWeek(date: string) {
    return moment(date, this._isoFormat)
      .startOf("week")
      .format(this._isoFormat);
  }

  getWeek(date: string) {
    return moment(date, this._isoFormat).isoWeek();
  }

  /**
   * SETTERS
   */
  setYear(date: string, year: number) {
    return moment(date, this._isoFormat)
      .year(year)
      .format(this._isoFormat);
  }

  setMonth(date: string, month: number) {
    return moment(date, this._isoFormat)
      .month(month)
      .format(this._isoFormat);
  }

  setHour(date: string, hour: number) {
    return moment(date, this._isoFormat)
      .hour(hour)
      .format(this._isoFormat);
  }

  setMinute(date: string, minute: number) {
    return moment(date, this._isoFormat)
      .minute(minute)
      .format(this._isoFormat);
  }

  setSecond(date: string, second: number) {
    return moment(date, this._isoFormat)
      .second(second)
      .format(this._isoFormat);
  }

  // RENDERERS
  renderTimestampRange(start: string, end: string, format: string) {
    const startMoment = moment(start, this._isoFormat);
    const endMoment = moment(end, this._isoFormat);

    if (startMoment.isSame(endMoment, "day")) {
      return `${startMoment.format(format)} - ${endMoment.format("HH:mm")}`;
    }

    return `${startMoment.format(format)} - ${endMoment.format(format)}`;
  }
}

const DateUtil = new DateTimeUtil(ISO_DATE_FORMAT);
const TimeUtil = new DateTimeUtil(ISO_TIME_FORMAT);
const TimestampUtil = new DateTimeUtil(ISO_TIMESTAMP_FORMAT);

export { DateUtil, TimeUtil, TimestampUtil };
