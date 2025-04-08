global class ScheduleGetTrailers implements Schedulable {

    // run every 1 hours
    // System.schedule('ScheduleGetTrailers :00', '0 0 * * * ?', new ScheduleGetTrailers());

    global void execute(SchedulableContext SC) {
        GetTrailersSchedCtrl.getTrailers();
    }
 }