package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    void add(User user);

    User getUserById(Long id);

    List<User> getAllUsers();

    void remove(Long id);

    void updateUser(User user);

    User getUserByUsername(String username);

    User getUserByEMail(String userEMail);

    void removeRoleFromUser(Long userID, String roleName);

    void saveRoleToUser(Long userId, String roleName);
}
