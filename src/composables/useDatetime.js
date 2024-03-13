import { DateTime, Duration } from 'luxon';

/**
 * all functions will return the localized date/time based on the user's system 
 */
export default {
    durationUntilDate( dateISO, { units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] } = {} ) {
        // get end date to local dateTime
        const trackedDate = DateTime.fromISO(dateISO); // fromISO will convert UTC to local by default

        const duration = DateTime.local().until(trackedDate);

        return {
            ...duration.toDuration(units).toObject(),
            durationISO: duration.toDuration(units).toISO(),
            isValid: duration.isValid,
        };
    },
    getDiffFromISO( dateISO , { units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] } = {} ) {
        return DateTime.local().diff(DateTime.fromISO(dateISO), units).toObject();
    },
    toLocalDate( dateISO ) {
        return DateTime.fromISO(dateISO).toLocaleString();
    },
    localizeISO( dateISO ) {
        return DateTime.fromISO(dateISO).toISO();
    },
    durationObjToISO( durationObj ) {
        // ex -> durationsObj = { months: 5 }
        return Duration.fromObject(durationObj).toISO();
    },
    durationISOToObj( durationISO ) {
        return Duration.fromISO(durationISO).toObject();
    }
  };
  