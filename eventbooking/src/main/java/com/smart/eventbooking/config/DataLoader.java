package com.smart.eventbooking.config;

import com.smart.eventbooking.entity.Event;
import com.smart.eventbooking.entity.User;
import com.smart.eventbooking.repository.EventRepository;
import com.smart.eventbooking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(
            UserRepository userRepository,
            EventRepository eventRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            // =========================
            // SEED USERS
            // =========================
            if (userRepository.count() == 0) {

                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");

                User user = new User();
                user.setName("Test User");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole("USER");

                userRepository.saveAll(List.of(admin, user));

                System.out.println("✅ Sample users seeded");
            } else {
                System.out.println("ℹ️ Users already exist. Skipping user seeding.");
            }

            // =========================
            // SEED EVENTS
            // =========================
            if (eventRepository.count() == 0) {

                Event e1 = new Event();
                e1.setTitle("Tech Conference 2025");
                e1.setDescription("Annual technology conference");
                e1.setLocation("Bangalore");
                e1.setDate(LocalDate.now().plusDays(10));
                e1.setPrice(1500);
                e1.setAvailableSeats(100);

                Event e2 = new Event();
                e2.setTitle("Music Fest");
                e2.setDescription("Live music concert");
                e2.setLocation("Chennai");
                e2.setDate(LocalDate.now().plusDays(20));
                e2.setPrice(2000);
                e2.setAvailableSeats(200);

                Event e3 = new Event();
                e3.setTitle("Startup Meetup");
                e3.setDescription("Networking for startups");
                e3.setLocation("Hyderabad");
                e3.setDate(LocalDate.now().plusDays(15));
                e3.setPrice(500);
                e3.setAvailableSeats(50);

                eventRepository.saveAll(List.of(e1, e2, e3));

                System.out.println("✅ Sample events seeded");
            } else {
                System.out.println("ℹ️ Events already exist. Skipping event seeding.");
            }
        };
    }
}