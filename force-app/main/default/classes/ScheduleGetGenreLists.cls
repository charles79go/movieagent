global class ScheduleGetGenreLists implements Schedulable {

    // run every 1 hours
    // System.schedule('ScheduleGetGenreLists :20', '0 20 * * * ?', new ScheduleGetGenreLists());

    global void execute(SchedulableContext SC) {
        GetTrailersSchedCtrl.getGenreData('trending', 'Trending Movies');
        GetTrailersSchedCtrl.getGenreData('28', 'Action');
        GetTrailersSchedCtrl.getGenreData('10751', 'Family');
        GetTrailersSchedCtrl.getGenreData('12', 'Adventure');
        GetTrailersSchedCtrl.getGenreData('16', 'Animation');
    }
 }

