package com.shravan.mnemos.controller;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.repository.JournalEntryRepo;
import com.shravan.mnemos.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return journalService.saveItAll(entry);
    }
//    get mapping by id
    @GetMapping("/{id}")
    public JournalEntry getIdOnly(@PathVariable String id){
       return null;
    }
//    Delete the entries by id
    @DeleteMapping("/{id}")
    public JournalEntry deleteMapping(@PathVariable String id){
        System.out.println("Deleting the entry:"+id);
        return null;
    }
//    update the entries via id
    @PutMapping("/{id}")
    public JournalEntry updateMapping(@PathVariable String id , @RequestBody JournalEntry upd){
        return null;
    }

}
