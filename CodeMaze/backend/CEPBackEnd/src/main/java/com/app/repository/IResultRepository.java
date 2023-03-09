package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Result;
import com.app.entity.ResultPK;

@Repository
public interface IResultRepository extends JpaRepository<Result, ResultPK> {
//	@Transactional
//	@Modifying
//	@Query(value = "SELECT r FROM Result r")
//	List<Result> findAllResults();
//	@Query(value= "SELECT * FROM result_tbl  where result_student_prn = ?1", nativeQuery = true)
//	List<Result> findAllResultsBYAdminId(Long adminId);
}
