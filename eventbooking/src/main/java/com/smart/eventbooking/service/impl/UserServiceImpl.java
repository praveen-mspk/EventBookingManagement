package com.smart.eventbooking.service.impl;

import com.smart.eventbooking.entity.User;
import com.smart.eventbooking.exception.ResourceNotFoundException;
import com.smart.eventbooking.repository.UserRepository;
import com.smart.eventbooking.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }
}