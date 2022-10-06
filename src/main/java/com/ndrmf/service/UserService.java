package com.ndrmf.service;

import com.ndrmf.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
