package com.shravan.mnemos.repository;

import com.shravan.mnemos.entity.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;
public interface UserEntryRepo extends MongoRepository<Users, String> {

    // ✅ Used by UserDetailsServiceImpl, UserService, UserController
    Optional<Users> findByUserName(String userName);

    // ✅ Used by JournalService — @Query bypasses Spring's name parser
    @Query("{ 'userName': ?0 }")
    Users findByUserNameDirect(String userName);
}
