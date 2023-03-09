package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Result;

@Repository
public interface IResultRepository extends JpaRepository<Result, Long> {

}
