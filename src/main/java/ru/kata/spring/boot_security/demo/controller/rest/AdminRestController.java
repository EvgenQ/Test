package ru.kata.spring.boot_security.demo.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/allRoles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<List<Role>> (roleService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/InfoAboutAuthUser")
    public ResponseEntity<User> getAuthUser() {

        return new ResponseEntity<>((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(), HttpStatus.OK) ;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {

        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/users/showAll")
    public ResponseEntity<List<User>> getUsers() {

        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        user.setRoles(roleService.getRoles(user.getRoles()));

        userService.add(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {

        user.setRoles(roleService.getRoles(user.getRoles()));
        user.setId(id);

        userService.updateUser(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/user/delete/{id}")
    public void deleteUserById(@PathVariable Long id) {

        userService.remove(id);

    }
}
