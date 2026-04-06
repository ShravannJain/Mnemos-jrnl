package com.shravan.mnemos.repository;

import com.shravan.mnemos.entity.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserEntryRepo extends MongoRepository<Users, ObjectId> {
    Users findByUserName(String username);
}
