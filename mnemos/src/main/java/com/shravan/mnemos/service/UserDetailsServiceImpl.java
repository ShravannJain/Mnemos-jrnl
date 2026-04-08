package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.Users; // Import your Users entity
import com.shravan.mnemos.repository.UserEntryRepo; // Import your UserEntryRepo

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User; // Import Spring Security's User class
import org.springframework.stereotype.Service;

import java.util.Collections; // Used for providing default roles
import java.util.Optional;

/**
 * This service implements Spring Security's UserDetailsService interface.
 * It's responsible for loading user-specific data from the database
 * when Spring Security needs to authenticate a user.
 */
@Service // This annotation tells Spring to manage this class as a service bean.
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserEntryRepo userEntryRepo; // Spring will inject an instance of your repository here.

    /**
     * Loads user-specific data required by Spring Security for authentication.
     * Spring Security calls this method when a user attempts to log in.
     *
     * @param username The username provided during the login attempt.
     * @return A UserDetails object representing the user, which Spring Security understands.
     * @throws UsernameNotFoundException if the user with the given username is not found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Find the user in your MongoDB database using the provided username.
        //    We expect UserEntryRepo.findByUserName to return an Optional<Users>.
        Optional<Users> userOptional = userEntryRepo.findByUserName(username);

        // 2. If the user is NOT found in the database (Optional is empty), throw an exception.
        //    Spring Security will catch this and treat it as an authentication failure.
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // If the user was found, get the Users object from the Optional.
        Users user = userOptional.get();

        // 3. Convert your custom Users entity into Spring Security's standard UserDetails object.
        //    This object is what Spring Security uses internally for authentication.
        //    IMPORTANT: The password you provide here (user.getPassword()) MUST be the
        //    HASHED password that you previously stored in your database using bcrypt.
        //    Spring Security will automatically hash the password entered by the user
        //    during login and compare it to this stored hashed password.
        return User.withUsername(user.getUserName()) // Set the username
                   .password(user.getPassword())   // Set the HASHED password from your database
                   .roles("USER") // Assign a default role ("USER"). You can expand this later.
                   .build(); // Build the UserDetails object
    }
}
