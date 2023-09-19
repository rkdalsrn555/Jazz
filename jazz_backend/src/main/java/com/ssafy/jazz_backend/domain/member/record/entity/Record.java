package com.ssafy.jazz_backend.domain.member.record.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Record {

    @Id
    private RecordId id;
}
