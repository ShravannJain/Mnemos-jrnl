package com.shravan.mnemos.controller;


import com.shravan.mnemos.entity.Users;
import com.shravan.mnemos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Users> getAllUsers(){
        return userService.getAll();
    }

    @PostMapping
    public void createUser(@RequestBody Users users){
        userService.saveItAll(users);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Users users){
    Users userInDb = userService.findByUserName(users.getUserName());
    if(userInDb!=null){
    userInDb.setUserName(userInDb.getUserName());
    userInDb.setPassword(userInDb.getPassword());
    userService.saveItAll(userInDb);
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}
}
