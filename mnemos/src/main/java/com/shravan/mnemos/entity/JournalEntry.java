package com.shravan.mnemos.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Data
@Document(collection = "journal_entries")
public class JournalEntry {


    @Id
    private ObjectId id;
    private String title;
    private String content;

    private LocalDateTime date;


}
