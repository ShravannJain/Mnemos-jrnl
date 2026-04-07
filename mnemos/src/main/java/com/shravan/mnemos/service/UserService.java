package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.Users;
import com.shravan.mnemos.repository.UserEntryRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    @Autowired
    private UserEntryRepo userEntryRepo;
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

    public Optional<Users> findById(ObjectId id){
        return userEntryRepo.findById(id);
    }
    public void deleteById(ObjectId id){
        userEntryRepo.deleteById(id);
    }
    public void updatePut(Users users){
        userEntryRepo.save(users);
    }
    public Users findByUserName(String userName){
        return userEntryRepo.findByUserName(userName);
    }
}
