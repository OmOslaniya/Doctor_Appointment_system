package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Schedule findByDoctor(Doctor doctor);
    Schedule findByDoctorAndDate(Doctor doctor, LocalDate date);
}
