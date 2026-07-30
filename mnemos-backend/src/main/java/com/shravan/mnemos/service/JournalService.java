package com.shravan.mnemos.service;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.entity.Users;
import com.shravan.mnemos.repository.JournalEntryRepo;
import com.shravan.mnemos.repository.UserEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class JournalService {

    @Autowired
    private JournalEntryRepo journalEntryRepo;
    @Autowired
    private UserEntryRepo userEntryRepo;
    @Autowired
    private UserService userService;

    @Transactional
    public void saveEntry(JournalEntry journalEntry, String userName) {
        Users user = userEntryRepo.findByUserNameDirect(userName);
        journalEntry.setUserId(user.getId());
        journalEntry.setDate(LocalDateTime.now());
        JournalEntry saved = journalEntryRepo.save(journalEntry);
        user.getJournalEntries().add(saved);
        userEntryRepo.save(user);
    }

    // ✅ used by GET /journal — returns all journals for this user
    public List<JournalEntry> getAllEntriesByUserName(String userName) {
        Users user = userEntryRepo.findByUserNameDirect(userName);
        return user.getJournalEntries();
    }

    // ✅ used by DELETE, PUT, GET /{id} — for ownership check
    public String getUserIdByUsername(String userName) {
        Users user = userEntryRepo.findByUserNameDirect(userName);
        return user.getId();
    }

    public Optional<JournalEntry> findById(String id) {
        return journalEntryRepo.findById(id);
    }

    public void deleteById(String id) {
        journalEntryRepo.deleteById(id);
    }

    public void updatePut(JournalEntry journalEntry) {
        journalEntryRepo.save(journalEntry);
    }
}