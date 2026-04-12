package com.shravan.mnemos.controller;


import com.shravan.mnemos.entity.Users;
import com.shravan.mnemos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Users> getAllUsers(){
        return userService.getAll();
    }
// temp for register purpose
    @PostMapping("/register")
    public  ResponseEntity<Users> registerUser(@RequestBody Users newUser ){
        try {
            if(newUser.getPassword()==null || newUser.getPassword().isEmpty()){
                System.out.println("put something");
                return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Users savedUser = userService.saveItAll(newUser);
            return  new ResponseEntity<>(savedUser,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping
    public void createUser(@RequestBody Users users){
        userService.saveItAll(users);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginRequest) {
        Optional<Users> userInDb = userService.findByUserName(loginRequest.getUserName());

        if (userInDb.isPresent() && userService.checkPassword(loginRequest.getPassword(), userInDb.get().getPassword())) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Users userDetailsFromRequest){ // Renamed for clarity
        // Fetch the user from the database using their username. This returns an Optional<Users>.
        Optional<Users> userInDbOptional = userService.findByUserName(userDetailsFromRequest.getUserName());

        // Check if the user was actually found in the database.
        if (userInDbOptional.isPresent()) {
            // If found, get the actual Users object from the Optional.
            Users userInDb = userInDbOptional.get();

            // Now, update the fields of the 'userInDb' object.
            // Note: The 'userDetailsFromRequest.getPassword()' will be hashed by userService.saveItAll().
            // You can update the username as well if that's intended.
            userInDb.setUserName(userDetailsFromRequest.getUserName());
            userInDb.setPassword(userDetailsFromRequest.getPassword());

            // Save the updated user object back to the database.
            userService.saveItAll(userInDb);

            // Return the updated user object and a 200 OK status.
            return new ResponseEntity<>(userInDb, HttpStatus.OK);
        } else {
            // If no user was found with the provided username.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Indicate that the user was not found.
        }
    }
}
