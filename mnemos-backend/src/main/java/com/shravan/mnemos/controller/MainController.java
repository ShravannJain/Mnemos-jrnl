/* Ohk there will be so many comments , this is all written by me and for me , so ignore the grammer am not good at it */
package com.shravan.mnemos.controller;

import com.shravan.mnemos.entity.JournalEntry;
import com.shravan.mnemos.service.JournalService;
// Removed import for UserDetailsServiceImpl as we'll use the standard UserDetails interface
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails; // Import UserDetails interface
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/journal")
public class MainController {

    @Autowired
    private JournalService journalService;

    // GET - will fetch only the user's data not others auth it
    @GetMapping
    public ResponseEntity<?> getUserJournal(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // ✅ now uses username to fetch journals linked to this user
        List<JournalEntry> userEntries = journalService.getAllEntriesByUserName(userDetails.getUsername());
        return new ResponseEntity<>(userEntries, HttpStatus.OK);
    }

    // POST - creates an journal and link to that user only not other .
    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(
            @RequestBody JournalEntry entry,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {

            journalService.saveEntry(entry, userDetails.getUsername());
            return new ResponseEntity<>(entry, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // GET by id
    @GetMapping("/{id}")
    public ResponseEntity<JournalEntry> getIdOnly(@PathVariable String id) {
        Optional<JournalEntry> journalEntry = journalService.findById(id);
        if (journalEntry.isPresent()) {
            return new ResponseEntity<>(journalEntry.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // DELETE by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMapping(@PathVariable String id) {
        Optional<JournalEntry> delCheck = journalService.findById(id);
        if (delCheck.isPresent()) {
            journalService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // PUT - update by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMapping(@PathVariable String id, @RequestBody JournalEntry newEntry) {
        JournalEntry holdTheOld = journalService.findById(id).orElse(null);
        if (holdTheOld != null) {
            holdTheOld.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().isEmpty()
                    ? newEntry.getTitle() : holdTheOld.getTitle());
            holdTheOld.setContent(newEntry.getContent() != null && !newEntry.getContent().isEmpty()
                    ? newEntry.getContent() : holdTheOld.getContent());
            journalService.updatePut(holdTheOld);
            return new ResponseEntity<>(holdTheOld, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}