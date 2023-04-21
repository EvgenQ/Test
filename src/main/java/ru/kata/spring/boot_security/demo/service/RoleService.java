package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> getAllRoles();

    void createRole(Role role);

    Role getRoleByRoleName(String roleName);

    Set<Role> getRoles(Set<Role> roles);
}
