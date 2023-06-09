package com.famillink.model.service;

import com.famillink.model.domain.user.Schedule;


import java.sql.Date;
import java.util.List;

public interface ScheduleService {
    //일정 등록
    void addSchedule(Long accountUid, Long memberUid, Schedule schedule);

    //일정 조회

    Schedule findSchedule(Long uid);

    List<Schedule> findScheduleList(Schedule schedule);

    List<Schedule> findScheduleListByMemberUid(Long memberUid);

    List<Schedule> findScheduleListForMonth(Long account_uid);

    List<Schedule> findScheduleListForMonthTop5(Long account_uid);

    //일정 수정
    void modifySchedule(Long uid, Schedule schedule);

    //일정 삭제
    void removeSchedule(Long uid, Long account_uid);
}
