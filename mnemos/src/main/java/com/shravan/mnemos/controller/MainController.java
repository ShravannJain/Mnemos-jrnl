package com.shravan.mnemos.controller;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.repository.JournalEntryRepo;
import com.shravan.mnemos.service.JournalService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/journal")

public class MainController {
    @Autowired
    private JournalService journalService;
    @GetMapping
    public List<JournalEntry> getAll(){
        return journalService.getAll();
    }
    @PostMapping
    public JournalEntry createEntry(@RequestBody JournalEntry entry){
        entry.setDate(LocalDateTime.now());
        return journalService.saveItAll(entry);
    }
//    get mapping by id
    @GetMapping("/{id}")
    public JournalEntry getIdOnly(@PathVariable ObjectId id){
    return journalService.findById(id).orElse(null);
    }
//    Delete the entries by id
    @DeleteMapping("/{id}")
    public void deleteMapping(@PathVariable ObjectId id){
        journalService.deleteById(id);
    }
//    update the entries via id
    @PutMapping("/{id}")
    public JournalEntry updateMapping(@PathVariable ObjectId id , @RequestBody JournalEntry newEntry){
        JournalEntry holdTheOld=journalService.findById(id).orElse(null);
        if(holdTheOld!=null){
           holdTheOld.setTitle(newEntry.getTitle()!=null && !newEntry.getTitle().isEmpty() ? newEntry.getTitle(): holdTheOld.getTitle());
           holdTheOld.setContent(newEntry.getContent()!=null && !newEntry.getContent().isEmpty() ? newEntry.getContent(): holdTheOld.getContent());
        }
        journalService.updatePut(holdTheOld);
        return holdTheOld;
    }

}
