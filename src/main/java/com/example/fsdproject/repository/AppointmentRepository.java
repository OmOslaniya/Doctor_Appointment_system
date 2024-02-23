package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Appointment;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);

    List<Appointment> findBySchedule(Schedule schedule);

    Appointment findByScheduleAndSlot(Schedule schedule, String slot);
}
