package com.example.fsdproject.service;

import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.repository.AppointmentRepository;
import com.example.fsdproject.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Long scheduleId) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(scheduleId);
        return optionalSchedule.orElse(null);
    }

    public Schedule getSchedulesByDoctor(Doctor doctor) {
        return scheduleRepository.findByDoctor(doctor);
    }

    public Schedule findByDoctorAndDate(Doctor doctor, LocalDate date) {
        return scheduleRepository.findByDoctorAndDate(doctor, date);
    }

    public void bookSchedule(Schedule schedule) {
        // Perform additional validation if needed
        scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }
}
