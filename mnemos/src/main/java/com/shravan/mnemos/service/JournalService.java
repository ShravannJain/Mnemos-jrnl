package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.repository.JournalEntryRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JournalService {
    @Autowired
    private JournalEntryRepo journalEntryRepo;
    @Autowired
    private  UserService userService;
    public JournalEntry saveItAll(JournalEntry journalEntry){
        return journalEntryRepo.save(journalEntry);
    }
    public List<JournalEntry> getAll(){
        return journalEntryRepo.findAll();
    }

  public Optional<JournalEntry> findById(String id){
        return journalEntryRepo.findById(id);
  }
  public void deleteById(String id){
         journalEntryRepo.deleteById(id);
  }
    public void updatePut(JournalEntry journalEntry){
         journalEntryRepo.save(journalEntry);
    }
}
