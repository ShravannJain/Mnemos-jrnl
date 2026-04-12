package com.shravan.mnemos.repository;

import com.shravan.mnemos.entity.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserEntryRepo extends MongoRepository<Users, String> {
//    Users findByUserName(String username);
    Optional<Users> findByUserName(String username);
}
