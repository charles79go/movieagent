global class ScheduleGetBannerData implements Schedulable {

    // run every 1 hours
    // System.schedule('ScheduleGetBannerData :02', '0 2 * * * ?', new ScheduleGetBannerData());

    global void execute(SchedulableContext SC) {
        GetTrailersSchedCtrl.getBannerData();
    }
 }