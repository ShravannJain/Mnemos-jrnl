package com.shravan.mnemos.controller;

import com.shravan.mnemos.entity.JournalEntry;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/journal")
public class MainController {
    private Map<Long,JournalEntry> entries = new HashMap<>();
//    Get mapping to get all the entries
    @GetMapping
    public List<JournalEntry> getAll(){
        return new ArrayList<>(entries.values());
    }
//    post mapping to add the entries
    @PostMapping
    public boolean createEntry(@RequestBody JournalEntry myEntries){
        entries.put(myEntries.getId(), myEntries);
        return true;
    }
//    get mapping by id
    @GetMapping("/{id}")
    public JournalEntry getIdOnly(@PathVariable Long id){
       return entries.get(id);
    }
//    Delete the entries by id
    @DeleteMapping("/{id}")
    public JournalEntry deleteMapping(@PathVariable Long id){
        System.out.println("Deleting the entry:"+id);
        return entries.remove(id);
    }
//    update the entries via id
    @PutMapping("/{id}")
    public JournalEntry updateMapping(@PathVariable Long id , @RequestBody JournalEntry upd){
        return entries.put(id,upd);
    }

}
