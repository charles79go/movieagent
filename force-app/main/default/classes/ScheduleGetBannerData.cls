global class ScheduleGetBannerData implements Schedulable {

    // run every 1 hours
    // System.schedule('ScheduleGetBannerData :10', '0 10 * * * ?', new ScheduleGetBannerData());

    global void execute(SchedulableContext SC) {
        GetTrailersSchedCtrl.getBannerData();
    }
 }