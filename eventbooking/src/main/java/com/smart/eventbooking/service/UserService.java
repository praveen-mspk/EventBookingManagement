package com.smart.eventbooking.service;

import com.smart.eventbooking.entity.User;

public interface UserService {

    User registerUser(User user);

    User getUserByEmail(String email);
}