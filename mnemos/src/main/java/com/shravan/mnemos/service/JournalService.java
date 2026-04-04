package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.repository.JournalEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JournalService {
    @Autowired
    private JournalEntryRepo journalEntryRepo;
    public JournalEntry saveItAll(JournalEntry journalEntry){
        return journalEntryRepo.save(journalEntry);
    }
    public List<JournalEntry> getAll(){
        return journalEntryRepo.findAll();
    }

}
