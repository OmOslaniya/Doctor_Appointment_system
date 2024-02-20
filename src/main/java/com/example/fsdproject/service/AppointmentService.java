package com.example.fsdproject.service;

import com.example.fsdproject.entity.Appointment;
import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.repository.AppointmentRepository;
import com.example.fsdproject.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long appointmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        return optionalAppointment.orElse(null);
    }

    public List<Appointment> getAppointmentsByPatient(Patient patient) {
        return appointmentRepository.findByPatient(patient);
    }
    public List<Appointment> getAppointmentsBySchedule(Schedule schedule) {
        return appointmentRepository.findBySchedule(schedule);
    }

    public void bookAppointment(Appointment appointment) {
        try {
            // Get the patient associated with the appointment
            Patient patient = appointment.getPatient();

            // Make sure the patient is saved or retrieved from the database
            if (patient.getPatientId() == null) {
                // If patient is not saved, save it
                patient = patientRepository.save(patient);
            } else {
                // If patient is already saved, retrieve it from the database
                patient = patientRepository.findById(patient.getPatientId()).orElse(null);
            }

            // Set the saved/retrieved patient back to the appointment
            appointment.setPatient(patient);

            // Perform additional validation if needed

            // Save the appointment after ensuring patient is saved
            appointmentRepository.save(appointment);
        } catch (Exception e) {
            // Handle exceptions as needed
        }
    }

    public void deleteAppointment(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }
}
