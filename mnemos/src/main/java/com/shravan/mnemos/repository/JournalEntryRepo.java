package com.shravan.mnemos.repository;
import com.shravan.mnemos.entity.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalEntryRepo extends MongoRepository<JournalEntry,String>{

}
