package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.Users;
import com.shravan.mnemos.repository.UserEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    @Autowired
    private UserEntryRepo userEntryRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Users saveItAll(Users users){
        String plainPassword = users.getPassword();
        String hashedPassword = passwordEncoder.encode(plainPassword);
        users.setPassword(hashedPassword);
        return userEntryRepo.save(users);
    }
    public List<Users> getAll(){
        return userEntryRepo.findAll();
    }
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    public Optional<Users> findById(String id){
        return userEntryRepo.findById(id);
    }
    public void deleteById(String id){
        userEntryRepo.deleteById(id);
    }
    public void updatePut(Users users){
        userEntryRepo.save(users);
    }
    public Optional<Users> findByUserName(String userName){
        return userEntryRepo.findByUserName(userName);
    }
}
