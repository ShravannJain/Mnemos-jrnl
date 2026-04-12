package com.shravan.mnemos.repository;
import com.shravan.mnemos.entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JournalEntryRepo extends MongoRepository<JournalEntry, String> {
    List<JournalEntry> findByUserName(String userName);
}
