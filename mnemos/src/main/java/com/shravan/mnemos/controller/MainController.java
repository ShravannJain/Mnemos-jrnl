

/* Ohk there will be so many comments , this is all written by me and for me , so ignore the grammer am not good at it */
package com.shravan.mnemos.controller;
import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.repository.JournalEntryRepo;
import com.shravan.mnemos.service.JournalService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/journal")

public class MainController {
    @Autowired
    private JournalService journalService;
    /*
    So what this ResponseEntity does?  Normally what happens is even if my request hit the backend it treats as 200 ,
    even if it doenst find the required data. So am using this ResponseEntity class here.
    So i can set various condtion so it gives specific status code. haha :)
    * */
    @GetMapping
    public ResponseEntity<?> getAll(){
        List<JournalEntry> checkAll = journalService.getAll();
        if(checkAll!=null && !checkAll.isEmpty()){
            return new ResponseEntity<>(checkAll,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(@RequestBody JournalEntry entry){
        try {
            entry.setDate(LocalDateTime.now());
            journalService.saveItAll(entry);
            return new ResponseEntity<>(entry,HttpStatus.CREATED);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
//    get mapping by id
    @GetMapping("/{id}")
    public ResponseEntity<JournalEntry> getIdOnly(@PathVariable String id){
        Optional<JournalEntry> journalEntry = journalService.findById(id);
        if(journalEntry.isPresent()){
            return new ResponseEntity<>(journalEntry.get(), HttpStatus.OK);
        }
            return new ResponseEntity<> (HttpStatus.NOT_FOUND);
    }
//    Delete the entries by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMapping(@PathVariable String id){
        Optional<JournalEntry> delCheck = journalService.findById(id);
        if(delCheck.isPresent()){
            journalService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
//    update the entries via id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMapping(@PathVariable String id , @RequestBody JournalEntry newEntry){
        JournalEntry holdTheOld=journalService.findById(id).orElse(null);
        if(holdTheOld!=null){
           holdTheOld.setTitle(newEntry.getTitle()!=null && !newEntry.getTitle().isEmpty() ? newEntry.getTitle(): holdTheOld.getTitle());
           holdTheOld.setContent(newEntry.getContent()!=null && !newEntry.getContent().isEmpty() ? newEntry.getContent(): holdTheOld.getContent());
        journalService.updatePut(holdTheOld);
           return new ResponseEntity<>(holdTheOld,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
